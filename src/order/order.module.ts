import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderUserEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/order-product.entity';
import { CartModule } from 'src/cart/cart.module';
import { ProductsModule } from 'src/products/products.module';
import { PaymentModule } from 'src/payment/payment.module';
import { EmailModule } from 'src/message/email/email.module';

@Module({
  controllers: [OrderController],
  imports: [
    TypeOrmModule.forFeature([OrderUserEntity, OrderProductEntity]),
    CartModule,
    ProductsModule,
    PaymentModule,
    EmailModule,
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
