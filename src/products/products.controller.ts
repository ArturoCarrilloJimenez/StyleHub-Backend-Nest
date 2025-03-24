import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginateDto: PaginateDto) {
    return this.productsService.findAll(paginateDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':term')
  update(
    @Param('term', ParseUUIDPipe) term: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(term, updateProductDto);
  }

  @Delete(':term')
  remove(@Param('term', ParseUUIDPipe) term: string) {
    return this.productsService.remove(term);
  }
}
