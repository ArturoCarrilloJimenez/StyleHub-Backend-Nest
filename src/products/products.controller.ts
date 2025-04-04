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
import { ApiResponse } from '@nestjs/swagger';

import { ProductsService } from './services/products.service';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dto/';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/auth.entity';
import { Product } from './entities';

// TODO añadir método con like por nombre de producto entre otras cosas, esto se usara en un futuro para un búsqueda
// TODO añadir métodos para filtrar productos por el type y subtype
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Product is created',
  })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [Product],
    description: 'Product was correct',
  })
  findAll(@Query() paginateDto: PaginateDto) {
    return this.productsService.findAll(paginateDto);
  }

  @Get(':term')
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Product find by term',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':term')
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Product update',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Param('term', ParseUUIDPipe) term: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(term, updateProductDto);
  }

  @Delete(':term')
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Product delete',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('term', ParseUUIDPipe) term: string) {
    return this.productsService.remove(term);
  }
}
