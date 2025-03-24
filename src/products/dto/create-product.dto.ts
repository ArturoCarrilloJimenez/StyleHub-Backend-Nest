import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ProductImage } from '../entities/product.image.entity';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  tags?: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}
