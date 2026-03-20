import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CenterDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ['pending', 'verified', 'rejected'], default: 'pending' })
  status: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export const CenterSchema = SchemaFactory.createForClass(CenterDocument);
