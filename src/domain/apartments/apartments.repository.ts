import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../common/database/abstract.repository';
import { Apartment } from './entities/apartments.schema';
import { ListApartmentDto } from './dto/list-apartment.dto';

@Injectable()
export class ApartmentsRepository extends AbstractRepository<Apartment> {
  protected readonly logger = new Logger(ApartmentsRepository.name);

  constructor(
    @InjectModel(Apartment.name)
    apartmentModel: Model<Apartment>,
  ) {
    super(apartmentModel);
  }

  async find(
    page: number,
    pageSize: number,
    filterQuery: FilterQuery<Apartment> = {},
  ): Promise<ListApartmentDto[]> {
    const skip = (page - 1) * pageSize;

    return await this.model
      .find(filterQuery, {
        id: '$_id',
        _id: 0,
        name: 1,
        number: 1,
        price: 1,
        images: { $slice: 1 },
      })
      .skip(skip)
      .limit(pageSize)
      .lean<ListApartmentDto[]>(true);
  }
}
