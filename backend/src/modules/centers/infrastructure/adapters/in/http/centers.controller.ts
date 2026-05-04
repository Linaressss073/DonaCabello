import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GET_CENTERS_PORT, GetCentersPort } from '../../../../domain/ports/in/get-centers.port';
import { GET_CENTER_BY_ID_PORT, GetCenterByIdPort } from '../../../../domain/ports/in/get-center-by-id.port';
import { REGISTER_CENTER_PORT, RegisterCenterPort } from '../../../../domain/ports/in/register-center.port';
import { UPDATE_CENTER_STATUS_PORT, UpdateCenterStatusPort } from '../../../../domain/ports/in/update-center-status.port';
import { RegisterCenterDto } from './dto/register-center.dto';
import { UpdateCenterStatusDto } from './dto/update-center-status.dto';
import { JwtAuthGuard } from '../../../../../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../../../shared/guards/roles.guard';
import { Roles } from '../../../../../../shared/decorators/roles.decorator';
import { GetUser } from '../../../../../../shared/decorators/get-user.decorator';

@Controller('centers')
export class CentersController {
  constructor(
    @Inject(GET_CENTERS_PORT) private readonly getCentersUseCase: GetCentersPort,
    @Inject(GET_CENTER_BY_ID_PORT) private readonly getCenterByIdUseCase: GetCenterByIdPort,
    @Inject(REGISTER_CENTER_PORT) private readonly registerCenterUseCase: RegisterCenterPort,
    @Inject(UPDATE_CENTER_STATUS_PORT) private readonly updateCenterStatusUseCase: UpdateCenterStatusPort,
  ) {}

  @Get()
  getAll() {
    return this.getCentersUseCase.execute();
  }

  // Rutas estáticas ANTES que las dinámicas (:id)
  @UseGuards(JwtAuthGuard)
  @Get('panel/my')
  async panel(@GetUser() user: any) {
    const all = await this.getCentersUseCase.execute();
    return all.filter((c) => c.ownerId === user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  register(@Body() dto: RegisterCenterDto, @GetUser() user: any) {
    return this.registerCenterUseCase.execute({ ...dto, ownerId: user.id });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.getCenterByIdUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateCenterStatusDto) {
    return this.updateCenterStatusUseCase.execute({ id, status: dto.status });
  }
}
