import { Body, Controller, Get, Inject, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GET_CENTERS_PORT, GetCentersPort } from '../../../../domain/ports/in/get-centers.port';
import { REGISTER_CENTER_PORT, RegisterCenterPort } from '../../../../domain/ports/in/register-center.port';
import { CENTERS_REPOSITORY_PORT, CentersRepositoryPort } from '../../../../domain/ports/out/centers-repository.port';
import { RegisterCenterDto } from './dto/register-center.dto';
import { JwtAuthGuard } from '../../../../../auth/infrastructure/adapters/in/http/jwt-auth.guard';
import { GetUser, JwtUser } from '../../../../../../shared/decorators/get-user.decorator';
import { AppointmentDocument } from '../../../../../appointments/infrastructure/adapters/out/persistence/schemas/appointment.schema';
import { UserDocument } from '../../../../../auth/infrastructure/adapters/out/persistence/schemas/user.schema';
import { CenterEntity } from '../../../../domain/entities/center.entity';

const STATUS_MAP: Record<string, string> = {
  pending: 'Agendada',
  confirmed: 'Confirmada',
  completed: 'Realizada',
  cancelled: 'Cancelada',
};

function toFrontendCenter(c: CenterEntity) {
  return {
    id: c.id,
    nombre: c.name,
    zona: c.city,
    ciudad: c.city,
    direccion: c.address,
    horarios: '',
    rating: 0,
    reviews: 0,
    verificado: c.status === 'verified',
    servicios: [],
    telefono: c.phone,
    email: c.email,
    lat: c.latitude,
    lng: c.longitude,
  };
}

@Controller('centers')
export class CentersController {
  constructor(
    @Inject(GET_CENTERS_PORT) private readonly getCentersUseCase: GetCentersPort,
    @Inject(REGISTER_CENTER_PORT) private readonly registerCenterUseCase: RegisterCenterPort,
    @Inject(CENTERS_REPOSITORY_PORT) private readonly centersRepository: CentersRepositoryPort,
    @InjectModel(AppointmentDocument.name) private readonly appointmentModel: Model<AppointmentDocument>,
    @InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Get()
  async getAll() {
    const centers = await this.getCentersUseCase.execute();
    return centers.map(toFrontendCenter);
  }

  @Get('panel')
  @UseGuards(JwtAuthGuard)
  async panel(@GetUser() user: JwtUser) {
    const center = await this.centersRepository.findByOwnerId(user.id);
    if (!center) throw new NotFoundException('No tienes un centro registrado');

    const allAppointments = await this.appointmentModel
      .find({ centerId: center.id })
      .sort({ scheduledAt: 1 })
      .exec();

    const now = new Date();
    const startOfDay = new Date(now); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now); endOfDay.setHours(23, 59, 59, 999);

    const dayOfWeek = startOfDay.getDay();
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - dayOfWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const citasHoyDocs = allAppointments.filter((a) => {
      const d = new Date(a.scheduledAt);
      return d >= startOfDay && d <= endOfDay;
    });

    const citasSemanaDocs = allAppointments.filter((a) => {
      const d = new Date(a.scheduledAt);
      return d >= startOfWeek && d <= endOfWeek;
    });

    const toPanelAppointment = async (apt: AppointmentDocument) => {
      const donor = await this.userModel.findById(apt.donorId).exec();
      const date = new Date(apt.scheduledAt);
      return {
        id: (apt._id as any).toString(),
        hora: date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true }),
        fecha: date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }),
        donante: donor?.name ?? 'Donante',
        telefono: '',
        notas: apt.notes ?? '',
        estado: STATUS_MAP[apt.status] ?? 'Agendada',
      };
    };

    const citasHoy = await Promise.all(citasHoyDocs.map(toPanelAppointment));
    const citasSemana = await Promise.all(citasSemanaDocs.map(toPanelAppointment));

    const confirmadas = allAppointments.filter((a) => a.status === 'confirmed').length;
    const pendientes = allAppointments.filter((a) => a.status === 'pending').length;

    return {
      centro: toFrontendCenter(center),
      citasHoy,
      citasSemana,
      estadisticas: {
        confirmadas,
        pendientes,
        totalMes: allAppointments.length,
      },
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const center = await this.centersRepository.findById(id);
    if (!center) throw new NotFoundException('Centro no encontrado');
    return toFrontendCenter(center);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  register(@Body() dto: RegisterCenterDto, @GetUser() user: JwtUser) {
    const horarios = [
      dto.horarioSemana ? `Lun-Vie: ${dto.horarioSemana}` : '',
      dto.horarioSabado ? `Sáb: ${dto.horarioSabado}` : '',
      dto.horarioDomingo ? `Dom: ${dto.horarioDomingo}` : '',
    ].filter(Boolean).join(', ');

    return this.registerCenterUseCase.execute({
      name: dto.nombre ?? dto.name ?? '',
      address: [dto.direccion ?? dto.address, dto.barrio].filter(Boolean).join(' - '),
      city: dto.ciudad ?? dto.city ?? '',
      phone: dto.telefono ?? dto.phone ?? '',
      email: dto.email,
      description: [dto.descripcion ?? dto.description, horarios].filter(Boolean).join(' | '),
      ownerId: user.id,
      latitude: dto.latitude,
      longitude: dto.longitude,
    });
  }
}
