import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
// TODO: Add index
@Schema()
export class Apartment extends AbstractDocument {
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

  @Prop({ required: true })
  project: string;

  @Prop({ required: false })
  images: string[];
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
