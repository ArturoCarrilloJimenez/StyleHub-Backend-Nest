import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderUserEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { CartService } from 'src/cart/cart.service';
import { User } from 'src/auth/entities/auth.entity';
import { Cart, CartProduct } from 'src/cart/entities';
import { ProductsService } from 'src/products/products.service';
import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';
import { PaymentService } from 'src/payment/payment.service';
import { OrderPaymentDto } from './dto/order-payment.dto';
import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderStatus } from './interfaces/order.interfaces';

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

    private readonly paymentService: PaymentService,
  ) {}

  @Transactional()
  async checkOrder(orderPaymentDto: OrderPaymentDto, user: User) {
    const cart = await this.cartService.findOneCart(user);

    if (!cart || !cart.products || cart.products.length === 0) {
      throw new BadRequestException(
        'The cart is empty, please add product to Cart.',
      );
    }

    this.checkStockProducts(cart);

    const sessionPayment = await this.paymentService.createSessionPayment(
      cart,
      user,
      orderPaymentDto,
    );

    const order = await this.createOrder(user, sessionPayment.id);

    if (!order)
      throw new NotFoundException(
        'It has not been possible to create the order',
      );

    const orderProductPromise: Promise<OrderProductEntity | undefined>[] = [];

    cart.products.map((productCart) => {
      orderProductPromise.push(this.addOrderProduct(productCart, order));
    });

    await Promise.all(orderProductPromise);

    return { url: sessionPayment.url };
  }

  private async createOrder(user: User, paymentId: string) {
    const orderUser = this.orderUserRepository.create({
      user,
      sessionPaymentId: paymentId,
    });

    try {
      await this.orderUserRepository.save(orderUser);
      return orderUser;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  private async addOrderProduct(
    productCart: CartProduct,
    order: OrderUserEntity,
  ) {
    const orderProduct = this.orderProductRepository.create({
      order,
      product: productCart.product,
      quantity: productCart.quantity,
      size: productCart.size,
      unitPrice: productCart.product.price,
    });

    try {
      await this.orderProductRepository.save(orderProduct);
      return orderProduct;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async findOneOrder(idOrder: string) {
    const order = await this.orderUserRepository.findOneBy({ id: idOrder });

    if (!order)
      throw new NotFoundException('Order not found, please try again later.');

    return order;
  }
  async findOneOrderBySessionPaymentId(idOrderSessionPayment: string) {
    const order = await this.orderUserRepository.findOneBy({
      sessionPaymentId: idOrderSessionPayment,
    });

    if (!order)
      throw new NotFoundException('Order not found, please try again later.');

    return order;
  }

  async updateOrderStatusBySessionPayment(
    idOrder: string,
    orderUpdate: OrderUpdateDto,
  ) {
    const order = await this.findOneOrderBySessionPaymentId(idOrder);

    switch (orderUpdate.status) {
      case OrderStatus['SUCCESSFUL']:
        await this.cartService.removeCart(order.user);
        await this.modifyStockProduct(order);
        break;

      default:
        break;
    }

    const orderPreload = await this.orderUserRepository.preload({
      id: order.id,
      ...orderUpdate,
    });

    if (!orderPreload)
      throw new NotFoundException('Order not found, please try again later.');

    try {
      await this.orderUserRepository.save(orderPreload);
      return orderPreload;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  private checkStockProducts(cart: Cart) {
    cart.products.map((productCart) => {
      if (productCart.quantity > productCart.product.stock)
        throw new BadRequestException(
          `Product ${productCart.product.title} does not have enough stock, it only has ${productCart.product.stock} units`,
        );
    });
  }

  private async modifyStockProduct(order: OrderUserEntity) {
    const updateProductPromise: Promise<any>[] = [];

    order.orderProducts.map((cartProduct) => {
      const newStock = cartProduct.product.stock - cartProduct.quantity;

      if (newStock < 0)
        throw new BadRequestException(
          `Product ${cartProduct.product.title} does not have enough stock, it only has ${cartProduct.product.stock} units`,
        );

      updateProductPromise.push(
        this.productService.update(cartProduct.product.id, {
          stock: newStock,
        }),
      );
    });

    await Promise.all(updateProductPromise);
  }
}
