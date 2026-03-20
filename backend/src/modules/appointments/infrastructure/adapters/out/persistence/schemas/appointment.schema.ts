import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AppointmentDocument extends Document {
  @Prop({ required: true })
  donorId: string;

  @Prop({ required: true })
  centerId: string;

  @Prop({ required: true })
  scheduledAt: Date;

  @Prop({ required: true, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' })
  status: string;

  @Prop()
  notes: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(AppointmentDocument);
