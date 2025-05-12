import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../interfaces/order.interfaces';

export class OrderUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(Object.values(OrderStatus))
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  paymentId?: string;
}
