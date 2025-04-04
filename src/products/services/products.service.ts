import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { validate as isUUID } from 'uuid';

import { ProductType, Product, ProductTags } from '../entities';
import { User } from 'src/auth/entities/auth.entity';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';

import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,

    @InjectRepository(ProductTags)
    private readonly productTagsRepository: Repository<ProductTags>,

    private readonly dataSource: DataSource,
  ) {}

  // TODO Validar que exista el tags y el typo y si existe añadirlo
  async create(createProductDto: CreateProductDto, user: User) {
    const { type, tags = [], ...productDetail } = createProductDto;

    try {
      const product = this.productRepository.create({
        ...productDetail,
        user,
      });
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async findAll(paginateDto: PaginateDto) {
    const { limit = 12, offset = 0 } = paginateDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {},
    });

    return products.map((product) => ({
      ...product,
    }));
  }

  async findOne(term: string) {
    let product: Product | null;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('product');

      term = term.toLowerCase();

      product = await queryBuilder
        .where('LOWER (product.title) =:title or product.slug =:slug', {
          title: term,
          slug: term,
        })
        .leftJoinAndSelect('product.images', 'productImages')
        .getOne();
    }

    if (!product) throw new NotFoundException('This product not found');

    return product;
  }

  async findOnePlain(term: string) {
    const { ...rest } = await this.findOne(term);
    return {
      ...rest,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { type, tags = [], ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      id: id,
      ...toUpdate,
    });

    if (!product)
      throw new NotFoundException(`Product whit id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.productRepository.save(product);

      await queryRunner.commitTransaction();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      handleExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const product: Product | undefined = await this.findOne(id);

    if (!product) return;

    await this.productRepository.remove(product);

    return product;
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder();

    try {
      return await query.delete().execute();
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }
}
