import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartments.schema';
import { ApartmentsRepository } from './apartments.repository';
import { MinioStorageService } from 'src/common/storage/minio-storage/minio-storage.service';
import { PageDto } from 'src/common/dto/page.dto';

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
    // const uploadImages = await Promise.all(
    //   imagesArray.map((image) => {
    //     return this.minioStorageService.uploadFile(image);
    //   }),
    // );
    // const fileName = await this.minioStorageService.bucketExists();
    // console.log(fileName);
    const doc = {
      ...createApartmentDto,
      images: ['https://nextui.org/images/card-example-2.jpeg'],
    };
    console.log(doc);
    const createdApartment = await this.apartmentRepository.create(doc);

    return createdApartment;
  }

  async findById(id: string): Promise<Apartment> {
    return await this.apartmentRepository.findOne({ _id: id });
  }
  async findAll(searchQuery: string, pageNumber: number, pageSize: number) {
    const documents = await this.apartmentRepository.find(
      {},
      pageNumber,
      pageSize,
      searchQuery,
    );
    const totalPages = await this.apartmentRepository.getTotalPages(pageSize);

    return new PageDto(documents, { totalPages });
  }
  async remove(id: string) {
    return await this.apartmentRepository.findOneAndDelete({ _id: id });
  }

  //   create(createApartmentDto: CreateApartmentDto) {
  //     throw new Error('Method not implemented.');
  //   }
}
