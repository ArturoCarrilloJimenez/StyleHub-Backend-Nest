import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ValidSizes } from 'src/products/interfaces/product.interface';

export class UpdateCartProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  product: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(ValidSizes)
  size?: string;
}
