// paginate-products.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';

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
  @IsString({ each: true })
  types?: string[] | string = [];

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
}
