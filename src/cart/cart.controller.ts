import { Controller, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/auth.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Auth()
  getOneCart(@GetUser() user: User) {
    return this.cartService.getOne(user);
  }

  @Delete()
  @Auth()
  deleteOneCart(@GetUser() user: User) {
    return this.cartService.deleteCart(user);
  }
}
