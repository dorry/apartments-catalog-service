import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './entities/apartments.schema';
import { DatabaseModule } from '../../common/database/database.module';
import { ApartmentsRepository } from './apartments.repository';
import { MinioStorageModule } from '../../common/storage/minio-storage/minio-storage.module';

@Module({
  imports: [
    DatabaseModule,
    // LocalStorageModule,
    MinioStorageModule,
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
  ],
  providers: [ApartmentsService, ApartmentsRepository],
  controllers: [ApartmentsController],
})
export class ApartmentsModule {}
