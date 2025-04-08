import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartProduct } from './entities';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';

@Injectable()
export class CartService {
  private readonly logger = new Logger('CartService');

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<Cart>,
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

  async getOne(user: User) {
    let cart: Cart | null | undefined = await this.cartRepository.findOneBy({
      user: { id: user.id },
    });

    if (!cart) cart = await this.createCart(user);

    if (!cart)
      throw new NotFoundException('Cart not found, please try again later.');

    return cart;
  }

  async deleteCart(user: User) {
    const cart = await this.cartRepository.findOneBy({
      user: { id: user.id },
    });

    if (!cart) return;

    await this.cartRepository.remove(cart);

    return cart;
  }
}
