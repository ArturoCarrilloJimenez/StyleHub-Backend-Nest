// paginate-products.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';
import { ValidGender } from '../interfaces/product.interface';

export class FindAllProductsDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  activeProducts?: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string = '';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number = Number.MAX_VALUE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  types?: string[] = [];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(Object.values(ValidGender), { each: true })
  genders?: string[] = [];
}
