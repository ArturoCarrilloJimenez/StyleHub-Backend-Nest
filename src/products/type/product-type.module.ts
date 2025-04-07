import { Module } from '@nestjs/common';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
