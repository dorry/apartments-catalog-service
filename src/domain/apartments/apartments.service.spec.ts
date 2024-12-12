import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentsService } from './apartments.service';
import { ApartmentsRepository } from './apartments.repository';
import { MinioStorageService } from '../../common/storage/minio-storage/minio-storage.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartments.schema';
import { PageDto } from '../../common/dto/page.dto';

describe('ApartmentsService', () => {
  let service: ApartmentsService;
  let repository: jest.Mocked<ApartmentsRepository>;
  let storageService: jest.Mocked<MinioStorageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ApartmentsRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            getTotalPages: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
        {
          provide: MinioStorageService,
          useValue: {
            uploadFile: jest.fn(),
          },
        },
        ApartmentsService,
      ],
    }).compile();

    service = module.get<ApartmentsService>(ApartmentsService);
    repository =
      module.get<jest.Mocked<ApartmentsRepository>>(ApartmentsRepository);
    storageService =
      module.get<jest.Mocked<MinioStorageService>>(MinioStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an apartment', async () => {
      const createApartmentDto: CreateApartmentDto = {} as any;
      const imagesArray: Array<Express.Multer.File> = [
        {
          originalname: 'image1.jpg',
          buffer: Buffer.from('image1'),
        },
        {
          originalname: 'image2.jpg',
          buffer: Buffer.from('image2'),
        },
      ] as any;
      const uploadedImages = ['image1.jpg', 'image2.jpg'];
      const createdApartment: Apartment = {} as any;

      jest
        .spyOn(storageService, 'uploadFile')
        .mockResolvedValueOnce(uploadedImages[0]);

      jest
        .spyOn(storageService, 'uploadFile')
        .mockResolvedValueOnce(uploadedImages[1]);

      jest.spyOn(repository, 'create').mockResolvedValue(createdApartment);

      const result = await service.create(createApartmentDto, imagesArray);

      expect(result).toEqual(createdApartment);
      expect(storageService.uploadFile).toHaveBeenCalledTimes(
        imagesArray.length,
      );
      expect(repository.create).toHaveBeenCalledWith({
        ...createApartmentDto,
        images: uploadedImages,
      });
    });
  });

  describe('findById', () => {
    it('should return an apartment by id', async () => {
      const id = 'someId';
      const apartment: Apartment = {} as any;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(apartment);

      const result = await service.findById(id);

      expect(result).toEqual(apartment);
      expect(repository.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of apartments', async () => {
      const searchQuery = 'query';
      const pageNumber = 1;
      const pageSize = 10;
      const documents = [];
      const totalPages = 5;

      jest.spyOn(repository, 'find').mockResolvedValueOnce(documents);
      jest.spyOn(repository, 'getTotalPages').mockResolvedValueOnce(totalPages);

      const result = await service.findAll(searchQuery, pageNumber, pageSize);

      expect(result).toEqual(new PageDto(documents, { totalPages }));
      expect(repository.find).toHaveBeenCalledWith(
        pageNumber,
        pageSize,
        searchQuery,
      );
      expect(repository.getTotalPages).toHaveBeenCalledWith(pageSize);
    });
  });

  describe('remove', () => {
    it('should remove an apartment by id', async () => {
      const id = 'someId';
      const apartment: Apartment = {} as any;

      jest
        .spyOn(repository, 'findOneAndDelete')
        .mockResolvedValueOnce(apartment);

      const result = await service.remove(id);

      expect(result).toEqual(apartment);
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ _id: id });
    });
  });
});
