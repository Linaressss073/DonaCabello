import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CampaignDocument extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true })
  centerId: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: 0 })
  goal: number;

  @Prop({ default: 0 })
  current: number;

  @Prop({ default: true })
  active: boolean;
}

export const CampaignSchema = SchemaFactory.createForClass(CampaignDocument);
