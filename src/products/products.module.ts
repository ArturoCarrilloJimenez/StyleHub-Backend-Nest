import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product, ProductTags } from './entities/';
import { AuthModule } from 'src/auth/auth.module';
import { ProductTypeModule } from './type/product-type.module';
import { ProductType } from './type/entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductType, ProductTags]),
    AuthModule,
    ProductTypeModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
