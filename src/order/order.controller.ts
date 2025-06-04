import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserEntity } from 'src/auth/entities/auth.entity';
import { OrderPaymentDto } from './dto/order-payment.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Auth()
  create(@Body() orderPaymentDto: OrderPaymentDto, @GetUser() user: UserEntity) {
    return this.orderService.checkOrder(orderPaymentDto, user);
  }
}
