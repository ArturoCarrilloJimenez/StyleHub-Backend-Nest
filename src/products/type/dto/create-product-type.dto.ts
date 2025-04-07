import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductTypeDto {
  @ApiProperty({ description: 'title is uniq value' })
  @IsString()
  @MinLength(1)
  name: string;
}
