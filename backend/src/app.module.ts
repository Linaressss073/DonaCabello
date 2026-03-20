import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { CentersModule } from './modules/centers/centers.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CommunityModule } from './modules/community/community.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/dona-cabello'),
    AuthModule,
    CentersModule,
    AppointmentsModule,
    CampaignsModule,
    CommunityModule,
  ],
})
export class AppModule {}
