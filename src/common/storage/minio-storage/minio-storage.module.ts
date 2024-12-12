import { Module } from '@nestjs/common';
import { MinioStorageService } from './minio-storage.service';
import { ConfigModule } from '../../../common/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [MinioStorageService],
  exports: [MinioStorageService],
})
export class MinioStorageModule {}
