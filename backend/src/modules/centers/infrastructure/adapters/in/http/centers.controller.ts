import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { GET_CENTERS_PORT, GetCentersPort } from '../../../../domain/ports/in/get-centers.port';
import { REGISTER_CENTER_PORT, RegisterCenterPort } from '../../../../domain/ports/in/register-center.port';
import { RegisterCenterDto } from './dto/register-center.dto';
import { JwtAuthGuard } from '../../../../../../shared/guards/jwt-auth.guard';
import { GetUser } from '../../../../../../shared/decorators/get-user.decorator';

@Controller('centers')
export class CentersController {
  constructor(
    @Inject(GET_CENTERS_PORT) private readonly getCentersUseCase: GetCentersPort,
    @Inject(REGISTER_CENTER_PORT) private readonly registerCenterUseCase: RegisterCenterPort,
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
  getOne(@Param('id') _id: string) {
    throw new Error('Not implemented');
  }
}
