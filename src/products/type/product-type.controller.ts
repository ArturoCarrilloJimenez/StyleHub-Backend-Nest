import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateProductTypeDto, UpdateProductTypeDto } from './dto';
import { ProductType } from './entities';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('products/type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    type: ProductType,
    description: 'Product type is created',
  })
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [ProductType],
    description: 'Product type was correct',
  })
  findAll(@Query() paginateDto: PaginateDto) {
    return this.productTypeService.findAll(paginateDto);
  }

  @Get(':term')
  @ApiResponse({
    status: 200,
    type: ProductType,
    description: 'Product type find by term',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('term') term: string) {
    return this.productTypeService.findOne(term);
  }

  @Patch(':term')
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    type: ProductType,
    description: 'Product type update',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Param('term', ParseUUIDPipe) term: string,
    @Body() updateProductDto: UpdateProductTypeDto,
  ) {
    return this.productTypeService.update(term, updateProductDto);
  }

  @Delete(':term')
  @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    type: ProductType,
    description: 'Product type delete',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('term', ParseUUIDPipe) term: string) {
    return this.productTypeService.remove(term);
  }
}
