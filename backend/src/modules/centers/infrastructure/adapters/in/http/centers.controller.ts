import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { GET_CENTERS_PORT, GetCentersPort } from '../../../../domain/ports/in/get-centers.port';
import { REGISTER_CENTER_PORT, RegisterCenterPort } from '../../../../domain/ports/in/register-center.port';
import { RegisterCenterDto } from './dto/register-center.dto';

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

  @Get(':id')
  getOne(@Param('id') id: string) {
    // TODO: implementar GetCenterByIdUseCase
    throw new Error('Not implemented');
  }

  @Post('register')
  register(@Body() dto: RegisterCenterDto) {
    // TODO: extraer ownerId del JWT
    throw new Error('Not implemented');
  }

  @Get('panel')
  panel() {
    // TODO: implementar con JwtAuthGuard + extraer ownerId
    throw new Error('Not implemented');
  }
}
