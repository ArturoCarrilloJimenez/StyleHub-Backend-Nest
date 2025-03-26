import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ValidGender,
  ValidSizes,
  ValidTypes,
} from '../interfaces/product.interface';

export class CreateProductDto {
  @ApiProperty({ description: 'title is uniq value' })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({ description: 'price is optional', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ description: 'description is optional', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'slug is optional, auto generate whit title',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'stock is optional', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @ApiProperty({ description: 'description is optional' })
  @IsString({ each: true })
  @IsArray()
  sizes: ValidSizes[];

  @ApiProperty({ description: 'select one [shirts, pants, hoodies, hats]' })
  @IsIn(['shirts', 'pants', 'hoodies', 'hats'])
  type: ValidTypes;

  @ApiProperty({ description: 'select one [men, women, kid, unisex]' })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: ValidGender;

  @ApiProperty({ description: 'tags is optional', required: false })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  tags?: string[];

  @ApiProperty({ description: 'images is optional', required: false })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}
