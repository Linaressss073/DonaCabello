import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsController } from './infrastructure/adapters/in/http/campaigns.controller';
import { GetCampaignsUseCase } from './application/use-cases/get-campaigns.use-case';
import { GetCampaignByIdUseCase } from './application/use-cases/get-campaign-by-id.use-case';
import { MongooseCampaignsRepository } from './infrastructure/adapters/out/persistence/mongoose-campaigns.repository';
import { CampaignDocument, CampaignSchema } from './infrastructure/adapters/out/persistence/schemas/campaign.schema';
import { CAMPAIGNS_REPOSITORY_PORT } from './domain/ports/out/campaigns-repository.port';
import { GET_CAMPAIGNS_PORT } from './domain/ports/in/get-campaigns.port';
import { GET_CAMPAIGN_BY_ID_PORT } from './domain/ports/in/get-campaign-by-id.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: CampaignDocument.name, schema: CampaignSchema }])],
  controllers: [CampaignsController],
  providers: [
    { provide: CAMPAIGNS_REPOSITORY_PORT, useClass: MongooseCampaignsRepository },
    { provide: GET_CAMPAIGNS_PORT, useClass: GetCampaignsUseCase },
    { provide: GET_CAMPAIGN_BY_ID_PORT, useClass: GetCampaignByIdUseCase },
  ],
})
export class CampaignsModule {}
