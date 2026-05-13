import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GET_CAMPAIGNS_PORT, GetCampaignsPort } from '../../../../domain/ports/in/get-campaigns.port';
import { GET_CAMPAIGN_BY_ID_PORT, GetCampaignByIdPort } from '../../../../domain/ports/in/get-campaign-by-id.port';
import { CREATE_CAMPAIGN_PORT, CreateCampaignPort } from '../../../../domain/ports/in/create-campaign.port';
import { UPDATE_CAMPAIGN_PORT, UpdateCampaignPort } from '../../../../domain/ports/in/update-campaign.port';
import { DELETE_CAMPAIGN_PORT, DeleteCampaignPort } from '../../../../domain/ports/in/delete-campaign.port';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { JwtAuthGuard } from '../../../../../../shared/guards/jwt-auth.guard';
import { GetUser } from '../../../../../../shared/decorators/get-user.decorator';

@Controller('campaigns')
export class CampaignsController {
  constructor(
    @Inject(GET_CAMPAIGNS_PORT) private readonly getCampaignsUseCase: GetCampaignsPort,
    @Inject(GET_CAMPAIGN_BY_ID_PORT) private readonly getCampaignByIdUseCase: GetCampaignByIdPort,
    @Inject(CREATE_CAMPAIGN_PORT) private readonly createCampaignUseCase: CreateCampaignPort,
    @Inject(UPDATE_CAMPAIGN_PORT) private readonly updateCampaignUseCase: UpdateCampaignPort,
    @Inject(DELETE_CAMPAIGN_PORT) private readonly deleteCampaignUseCase: DeleteCampaignPort,
  ) {}

  @Get()
  getAll() {
    return this.getCampaignsUseCase.execute();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.getCampaignByIdUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCampaignDto, @GetUser() user: any) {
    return this.createCampaignUseCase.execute({
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      centerId: dto.centerId,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      goal: dto.goal,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCampaignDto, @GetUser() user: any) {
    return this.updateCampaignUseCase.execute(id, user.id, {
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      goal: dto.goal,
      current: dto.current,
      active: dto.active,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: any) {
    await this.deleteCampaignUseCase.execute(id, user.id);
    return { message: 'Campaña eliminada' };
  }
}
