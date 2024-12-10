import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { Apartment } from './entities/apartments.schema';

@Injectable()
export class ApartmentsRepository extends AbstractRepository<Apartment> {
  protected readonly logger = new Logger(ApartmentsRepository.name);

  constructor(
    @InjectModel(Apartment.name)
    apartmentModel: Model<Apartment>,
  ) {
    super(apartmentModel);
  }
}
