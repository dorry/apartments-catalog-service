import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStorageService {
  async handleImageUpload(
    file: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    if (!file) {
      throw new BadRequestException('No image uploaded');
    }

    // validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid image type');
    }

    // validate file size (e.g., max 5mb)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('Image is too large!');
    }

    return file;
  }
}
