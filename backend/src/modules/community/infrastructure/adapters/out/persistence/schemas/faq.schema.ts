import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FaqDocument extends Document {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ default: 0 })
  order: number;
}

@Schema()
export class MythDocument extends Document {
  @Prop({ required: true })
  myth: string;

  @Prop({ required: true })
  reality: string;

  @Prop({ default: 0 })
  order: number;
}

@Schema({ timestamps: true })
export class ContactDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  userId?: string;
}

export const FaqSchema = SchemaFactory.createForClass(FaqDocument);
export const MythSchema = SchemaFactory.createForClass(MythDocument);
export const ContactSchema = SchemaFactory.createForClass(ContactDocument);
