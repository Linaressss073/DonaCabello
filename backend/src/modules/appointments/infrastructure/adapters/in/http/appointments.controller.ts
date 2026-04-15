import { Body, Controller, Get, Inject, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GET_MY_APPOINTMENTS_PORT, GetMyAppointmentsPort } from '../../../../domain/ports/in/get-my-appointments.port';
import { CREATE_APPOINTMENT_PORT, CreateAppointmentPort } from '../../../../domain/ports/in/create-appointment.port';
import { APPOINTMENTS_REPOSITORY_PORT, AppointmentsRepositoryPort } from '../../../../domain/ports/out/appointments-repository.port';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../../../../../auth/infrastructure/adapters/in/http/jwt-auth.guard';
import { GetUser, JwtUser } from '../../../../../../shared/decorators/get-user.decorator';
import { CenterDocument } from '../../../../../centers/infrastructure/adapters/out/persistence/schemas/center.schema';
import { AppointmentEntity } from '../../../../domain/entities/appointment.entity';

const STATUS_MAP: Record<string, string> = {
  pending: 'Agendada',
  confirmed: 'Confirmada',
  completed: 'Realizada',
  cancelled: 'Cancelada',
};

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(
    @Inject(GET_MY_APPOINTMENTS_PORT) private readonly getMyAppointmentsUseCase: GetMyAppointmentsPort,
    @Inject(CREATE_APPOINTMENT_PORT) private readonly createAppointmentUseCase: CreateAppointmentPort,
    @Inject(APPOINTMENTS_REPOSITORY_PORT) private readonly appointmentsRepository: AppointmentsRepositoryPort,
    @InjectModel(CenterDocument.name) private readonly centerModel: Model<CenterDocument>,
  ) {}

  @Get('my')
  async getMy(@GetUser() user: JwtUser) {
    const appointments = await this.getMyAppointmentsUseCase.execute(user.id);

    return Promise.all(appointments.map((apt) => this.toFrontendAppointment(apt, user)));
  }

  @Post()
  async create(@Body() dto: CreateAppointmentDto, @GetUser() user: JwtUser) {
    const centerId = dto.centroId ?? dto.centerId;
    let scheduledAt: Date;

    if (dto.fecha && dto.hora) {
      scheduledAt = new Date(`${dto.fecha}T${dto.hora}:00`);
    } else if (dto.scheduledAt) {
      scheduledAt = new Date(dto.scheduledAt);
    } else {
      scheduledAt = new Date();
    }

    const saved = await this.createAppointmentUseCase.execute({
      donorId: user.id,
      centerId,
      scheduledAt,
      notes: dto.notas ?? dto.notes,
    });

    return this.toFrontendAppointment(saved, user);
  }

  @Patch(':id/confirm')
  async confirm(@Param('id') id: string) {
    const appointment = await this.appointmentsRepository.findById(id);
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    return this.appointmentsRepository.update(id, { status: 'confirmed' });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    const appointment = await this.appointmentsRepository.findById(id);
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    return this.appointmentsRepository.update(id, { status: 'cancelled' });
  }

  private async toFrontendAppointment(apt: AppointmentEntity, user: JwtUser) {
    const center = await this.centerModel.findById(apt.centerId).exec();
    const date = new Date(apt.scheduledAt);

    return {
      id: apt.id,
      donante: user.name,
      email: user.email,
      telefono: '',
      centro: center
        ? {
            id: center._id.toString(),
            nombre: center.name,
            direccion: center.address,
            telefono: center.phone,
          }
        : { id: apt.centerId ?? '', nombre: 'Centro no disponible', direccion: '', telefono: '' },
      fecha: date.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      hora: date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true }),
      notas: apt.notes,
      estado: STATUS_MAP[apt.status ?? 'pending'] ?? 'Agendada',
      creadoEn: apt.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }
}
