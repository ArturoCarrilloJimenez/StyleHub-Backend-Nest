import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartProduct } from './entities';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart, CartProduct]), ProductsModule],
  exports: [CartService],
})
export class CartModule {}
