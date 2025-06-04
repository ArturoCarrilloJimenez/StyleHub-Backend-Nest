import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserEntity } from 'src/auth/entities/auth.entity';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Auth()
  getOneCart(@GetUser() user: UserEntity) {
    return this.cartService.findOneCart(user);
  }

  @Patch()
  @Auth()
  addProduct(@GetUser() user: UserEntity, @Body() cartProduct: UpdateCartProductDto) {
    return this.cartService.updateProduct(cartProduct, user);
  }

  @Delete()
  @Auth()
  deleteOneCart(@GetUser() user: UserEntity) {
    return this.cartService.removeCart(user);
  }

  @Delete(':product')
  @Auth()
  deleteOneCartProduct(
    @Param(':product') product: string,
    @GetUser() user: UserEntity,
  ) {
    return this.cartService.removeProduct(product, user);
  }
}
