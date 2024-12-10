import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsUrl,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  //   @IsArray()
  //   @ArrayNotEmpty()
  //   @IsUrl({}, { each: true })
  //   images: File[];
}
