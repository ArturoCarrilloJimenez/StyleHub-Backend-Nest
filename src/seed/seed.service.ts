import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

import { initialData } from './data/seed';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async executeSeed() {
    await this.insertNewProduct();
    return `SEED execute`;
  }

  private async insertNewProduct() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromise: any[] = [];

    products.map((product) =>
      insertPromise.push(this.productService.create(product)),
    );

    await Promise.all(insertPromise);

    return true;
  }
}
