import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  mailingAddress: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  logisticsCosts: number;
}
