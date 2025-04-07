import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { UtilsModule } from 'src/commons/utils/utils.module';
import { ProductTypeModule } from 'src/products/type/product-type.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule, ProductTypeModule, AuthModule, UtilsModule],
})
export class SeedModule {}
