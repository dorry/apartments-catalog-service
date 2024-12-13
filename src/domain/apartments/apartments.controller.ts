import {
  Controller,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Get, Param, Post, Response } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentsService } from './apartments.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response as Res } from 'express';
import ApartmentsMapper from './mapper/apartments.mapper';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4))
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const apartmentDocument = await this.apartmentsService.create(
      createApartmentDto,
      images,
    );
    const apartmentMapper = new ApartmentsMapper();
    return apartmentMapper.apartmentDocumentToApartmentDto(apartmentDocument);
  }

  @Get('/redirect')
  async redirectFile(@Query('url') url: string, @Response() res: Res) {
    return res.redirect(url);
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
