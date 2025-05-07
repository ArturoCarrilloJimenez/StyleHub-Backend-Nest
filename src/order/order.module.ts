import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderUserEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/order-product.entity';
import { CartModule } from 'src/cart/cart.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrderController],
  imports: [
    TypeOrmModule.forFeature([OrderUserEntity, OrderProductEntity]),
    CartModule,
    ProductsModule,
  ],
  providers: [OrderService],
})
export class OrderModule {}
