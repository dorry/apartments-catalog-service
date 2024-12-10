import { Controller, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentsService } from './apartments.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({ destination: './uploads' }),
    }),
  )
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    console.log(images);
    return await this.apartmentsService.create(createApartmentDto, images);
  }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string) {
  //     return await this.apartmentsService.remove(id);
  //   }

  //   @Get()
  //   async findAll() {
  //     return await this.apartmentsService.findAll();
  //   }

  //   @Get(':id')
  //   async findOne(@Param('id') id: string) {
  //     return await this.apartmentsService.findOne(id);
  //   }
}
