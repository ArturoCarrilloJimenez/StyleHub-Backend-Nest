import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage } from './entities/product.image.entity';
import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const { images = [], ...productDetail } = createProductDto;

    try {
      const product = this.productRepository.create({
        ...productDetail,
        images: images.map((imageUrl) =>
          this.productImageRepository.create({ url: imageUrl }),
        ),
        user,
      });
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async findAll(paginateDto: PaginateDto) {
    const { limit = 10, offset = 0 } = paginateDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map((images) => images.url),
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
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...toUpdate } = updateProductDto;

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
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }

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
