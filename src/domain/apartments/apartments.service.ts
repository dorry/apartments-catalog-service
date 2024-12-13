import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartments.schema';
import { ApartmentsRepository } from './apartments.repository';
import { MinioStorageService } from '../../common/storage/minio-storage/minio-storage.service';
import { PageDto } from '../../common/dto/page.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class ApartmentsService {
  constructor(
    private readonly minioStorageService: MinioStorageService,
    private apartmentRepository: ApartmentsRepository,
  ) {}

  async create(
    createApartmentDto: CreateApartmentDto,
    imagesArray: Array<Express.Multer.File>,
  ): Promise<Apartment> {
    try {
      const images = await Promise.all(
        imagesArray.map((image) => {
          return this.minioStorageService.uploadFile(image);
        }),
      );

      const doc = {
        ...createApartmentDto,
        images,
        // images: ['https://nextui.org/images/card-example-2.jpeg'],
      };
      const createdApartment = await this.apartmentRepository.create(doc);

      return createdApartment;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findById(id: string): Promise<Apartment> {
    return await this.apartmentRepository.findOne({ _id: id });
  }
  async findAll(searchQuery: string, pageNumber: number, pageSize: number) {
    const searchRegex = new RegExp(searchQuery, 'i');

    const filterQuery: FilterQuery<Apartment> = searchQuery
      ? {
          $or: [
            {
              name: searchRegex,
            },
            {
              number: searchRegex,
            },
            {
              project: searchRegex,
            },
          ],
        }
      : {};
    const documents = await this.apartmentRepository.find(
      pageNumber,
      pageSize,
      filterQuery,
    );
    const totalPages = await this.apartmentRepository.getTotalPages(
      pageSize,
      filterQuery,
    );

    return new PageDto(documents, { totalPages });
  }
  async remove(id: string) {
    return await this.apartmentRepository.findOneAndDelete({ _id: id });
  }

  //   create(createApartmentDto: CreateApartmentDto) {
  //     throw new Error('Method not implemented.');
  //   }
}
