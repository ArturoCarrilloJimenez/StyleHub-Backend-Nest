import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Transactional } from 'typeorm-transactional';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderUserEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { CartService } from 'src/cart/cart.service';
import { User } from 'src/auth/entities/auth.entity';
import { Cart } from 'src/cart/entities';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities';
import { error } from 'console';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(OrderUserEntity)
    private readonly orderUserRepository: Repository<OrderUserEntity>,

    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,

    private readonly cartService: CartService,

    private readonly productService: ProductsService,
  ) {}

  @Transactional()
  async createOrder(createOrderDto: CreateOrderDto, user: User) {
    const cart = await this.cartService.findOneCart(user);

    this.checkStockProducts(cart);
  }

  private checkStockProducts(cart: Cart) {
    cart.products.map((productCart) => {
      if (productCart.quantity > productCart.product.stock)
        throw new BadRequestException(
          `Product ${productCart.product.title} does not have enough stock, it only has ${productCart.product.stock} units`,
        );
    });
  }
}
