import { Module } from '@nestjs/common';
import { ApartmentsModule } from './apartments/apartments.module';

@Module({
  imports: [ApartmentsModule],
})
export class DomainModule {}
