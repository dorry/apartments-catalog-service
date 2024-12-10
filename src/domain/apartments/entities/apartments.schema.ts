import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// TODO: Add index
@Schema()
export class Apartment extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true, index: true })
  project: string;

  @Prop({ required: false })
  images: string[];
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
