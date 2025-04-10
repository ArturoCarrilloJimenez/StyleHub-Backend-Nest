import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/auth.entity';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Auth()
  getOneCart(@GetUser() user: User) {
    return this.cartService.findOneCart(user);
  }

  @Post()
  @Auth()
  addProduct(@GetUser() user: User, @Body() cartProduct: UpdateCartProductDto) {
    return this.cartService.updateProduct(cartProduct, user);
  }

  @Delete()
  @Auth()
  deleteOneCart(@GetUser() user: User) {
    return this.cartService.removeCart(user);
  }

  @Delete(':product')
  @Auth()
  deleteOneCartProduct(
    @Param(':product') product: string,
    @GetUser() user: User,
  ) {
    return this.cartService.removeProduct(product, user);
  }
}
