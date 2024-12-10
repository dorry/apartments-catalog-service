import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
