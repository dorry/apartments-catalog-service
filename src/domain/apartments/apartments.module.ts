import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './entities/apartments.schema';
import { DatabaseModule } from 'src/common/database/database.module';
import { StorageModule } from 'src/common/storage/storage.module';
import { ApartmentsRepository } from './apartments.repository';

@Module({
  imports: [
    DatabaseModule,
    StorageModule,
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
  ],
  providers: [ApartmentsService, ApartmentsRepository],
  controllers: [ApartmentsController],
})
export class ApartmentsModule {}
