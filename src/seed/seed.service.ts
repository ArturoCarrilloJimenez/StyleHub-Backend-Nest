import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

import { initialData } from './data/seed';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async executeSeed(user: User) {
    await this.insertNewProduct(user);
    return `SEED execute`;
  }

  private async insertNewProduct(user: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromise: any[] = [];

    products.map((product) =>
      insertPromise.push(this.productService.create(product, user)),
    );

    await Promise.all(insertPromise);

    return true;
  }
}
