import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';

import { initialData } from './data/seed';
import { User } from 'src/auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptingData } from 'src/commons/utils/encriptData.utils';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly encryptData: EncryptingData,
  ) {}

  async executeSeed() {
    await this.deleteTables();
    const user: User = await this.insertNewUsers();
    await this.insertNewProducts(user);

    return `SEED execute`;
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().execute();
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.map((user) => {
      user.password = this.encryptData.encrypt(user.password);
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(users);

    return dbUsers[0];
  }

  private async insertNewProducts(user: User) {
    const products = initialData.products;

    const insertPromise: any[] = [];

    products.map((product) =>
      insertPromise.push(this.productService.create(product, user)),
    );

    await Promise.all(insertPromise);

    return true;
  }
}
