import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartments.schema';
import { ApartmentsRepository } from './apartments.repository';
import { StorageService } from 'src/common/storage/storage.service';

@Injectable()
export class ApartmentsService {
  constructor(
    private readonly storageService: StorageService,
    private apartmentRepository: ApartmentsRepository,
  ) {}

  async create(
    createApartmentDto: CreateApartmentDto,
    imagesArray: Array<Express.Multer.File>,
  ): Promise<Apartment> {
    const uploadImages = await Promise.all(
      imagesArray.map((image) => {
        return this.storageService.handleImageUpload(image);
      }),
    );
    console.log(uploadImages);
    const doc = new Apartment({
      ...createApartmentDto,
      //   images: uploadImages,
    });

    const createdApartment = await this.apartmentRepository.create(doc);

    return createdApartment;
  }

  //   async findById(id: string): Promise<Apartment> {
  //     const apartment = await this.apartmentModel
  //       .findById(id)
  //       .lean<Apartment>(true);
  //     if (!apartment) {
  //       this.logger.warn('Apartment was not found with ID:', id);
  //       throw new NotFoundException('Apartment was not found');
  //     }
  //   }
  //   findAll() {
  //     throw new Error('Method not implemented.');
  //   }
  //   remove(id: string) {
  //     throw new Error('Method not implemented.');
  //   }
  //   create(createApartmentDto: CreateApartmentDto) {
  //     throw new Error('Method not implemented.');
  //   }
}
