import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCartProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  product: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
