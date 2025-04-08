import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/';
import { AuthModule } from 'src/auth/auth.module';
import { ProductTypeModule } from './type/product-type.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product]), AuthModule, ProductTypeModule],
  exports: [ProductsService],
})
export class ProductsModule {}
