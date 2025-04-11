import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartProduct } from './entities';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';
import { ProductsService } from 'src/products/products.service';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';
import { Product } from 'src/products/entities';

@Injectable()
export class CartService {
  private readonly logger = new Logger('CartService');

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,

    private readonly productService: ProductsService,
  ) {}

  async createCart(user: User) {
    try {
      const cart = this.cartRepository.create({
        user,
      });

      await this.cartRepository.save(cart);

      return cart;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async findOneCart(user: User) {
    let cart: Cart | null | undefined = await this.cartRepository.findOneBy({
      user: { id: user.id },
    });

    if (!cart) cart = await this.createCart(user);

    if (!cart)
      throw new NotFoundException('Cart not found, please try again later.');

    return cart;
  }

  async removeCart(user: User) {
    const cart = await this.cartRepository.findOneBy({
      user: { id: user.id },
    });

    if (!cart) throw new NotFoundException('Cart not found');

    await this.cartRepository.remove(cart);
  }

  async updateProduct(updateCartProduct: UpdateCartProductDto, user: User) {
    const { quantity = 1, product } = updateCartProduct;

    const cart = await this.findOneCart(user);

    const cartProduct = await this.findCartProduct(product, cart);

    if (quantity <= 0) return this.removeProduct(product, user);

    if (!cartProduct) {
      const findProduct = await this.productService.findOne(product);

      await this.createCartProduct(cart, findProduct, quantity);
    } else {
      const updateCartProduct = await this.cartProductRepository.preload({
        id: cartProduct.id,
        quantity: quantity,
      });

      if (!updateCartProduct)
        throw new NotFoundException(`Cart Product not found`);

      try {
        await this.cartProductRepository.save(updateCartProduct);

        return this.findOneCart(user);
      } catch (error) {
        handleExceptions(error, this.logger);
      }
    }

    return this.findOneCart(user);
  }

  async removeProduct(product: string, user: User) {
    const cart = await this.findOneCart(user);
    const cartProduct = await this.findCartProduct(product, cart);

    if (!cartProduct)
      throw new BadRequestException(
        'The product was not found in the cart, check that the product is correct',
      );

    await this.cartProductRepository.remove(cartProduct);

    return this.findOneCart(user);
  }

  private async findCartProduct(product: string, cart: Cart) {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        cart: { id: cart.id },
        product: { id: product },
      },
    });

    if (!cartProduct) return false;

    return cartProduct;
  }

  private async createCartProduct(
    cart: Cart,
    product: Product,
    quantity: number,
  ) {
    if (quantity <= 0)
      throw new BadRequestException('The quantity must be positive');

    const cartProduct = this.cartProductRepository.create({
      cart,
      product,
      quantity,
    });

    try {
      await this.cartProductRepository.save(cartProduct);
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }
}
