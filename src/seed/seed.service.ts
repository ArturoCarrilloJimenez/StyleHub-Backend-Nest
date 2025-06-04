import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

import { initialData } from './data/seed';
import { UserEntity } from 'src/auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptingData } from 'src/commons/utils/encriptData.utils';
import { ProductTypeService } from 'src/products/type/product-type.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    private readonly productTypeService: ProductTypeService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly encryptData: EncryptingData,
  ) {}

  async executeSeed() {
    await this.deleteTables();
    const user: UserEntity = await this.insertNewUsers();
    await this.insertNewProductTypes();
    await this.insertNewProducts(user);

    return `SEED execute`;
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();
    await this.productTypeService.removeAllProductTypes();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().execute();
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;

    const users: UserEntity[] = [];

    seedUsers.map((user) => {
      user.password = this.encryptData.encrypt(user.password);
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(users);

    return dbUsers[0];
  }

  private async insertNewProductTypes() {
    const productTypes = initialData.productType;

    const insertPromise: any[] = [];

    productTypes.map((productType) =>
      insertPromise.push(this.productTypeService.create(productType)),
    );

    await Promise.all(insertPromise);

    return true;
  }

  private async insertNewProducts(user: UserEntity) {
    const products = initialData.products;

    const insertPromise: any[] = [];

    products.map((product) =>
      insertPromise.push(this.productService.create(product, user)),
    );

    await Promise.all(insertPromise);

    return true;
  }
}
