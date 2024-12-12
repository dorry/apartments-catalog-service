import {
  Controller,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentsService } from './apartments.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 4))
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    console.log(images);
    return await this.apartmentsService.create(createApartmentDto, images);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.apartmentsService.remove(id);
  // }

  @Get()
  async findAll(
    @Query('search') searchQuery: string = '',
    @Query('page') pageNumber = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return await this.apartmentsService.findAll(
      searchQuery,
      pageNumber,
      pageSize,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.apartmentsService.findById(id);
  }
}
