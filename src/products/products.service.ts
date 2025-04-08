import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { validate as isUUID } from 'uuid';

import { Product } from './entities';
import { User } from 'src/auth/entities/auth.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';

import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';
import { ProductTypeService } from './type/product-type.service';
import { ProductType } from './type/entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly productTypeService: ProductTypeService,
  ) {}

  // TODO Validar que exista el tags y el typo y si existe añadirlo
  async create(createProductDto: CreateProductDto, user: User) {
    const { type, ...productDetail } = createProductDto;

    const findType = await this.productTypeService.findOne(type);

    try {
      const product = this.productRepository.create({
        ...productDetail,
        user,
        type: findType,
      });
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async findAll(paginateDto: PaginateDto, isActiveProducts: boolean = true) {
    const { limit = 12, offset = 0 } = paginateDto;

    const whereCondition = isActiveProducts ? { isActive: true } : {};

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        type: true,
      },
      where: whereCondition,
    });

    return products.map((product) => ({
      ...product,
      type: product.type.name,
    }));
  }

  async findOne(term: string, isActiveProduct: boolean = true) {
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
        .leftJoinAndSelect('product.type', 'prodType')
        .getOne();
    }

    if (!product || (isActiveProduct == true && product.isActive != true))
      throw new NotFoundException('This product not found');

    return product;
  }

  async findOnePlain(term: string) {
    const { type, ...rest } = await this.findOne(term);
    return {
      ...rest,
      type: type.name,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { type, ...toUpdate } = updateProductDto;
    let findType: ProductType | undefined;

    if (type) findType = await this.productTypeService.findOne(type);

    const product = await this.productRepository.preload({
      id: id,
      ...toUpdate,
      type: findType,
    });

    if (!product)
      throw new NotFoundException(`Product whit id ${id} not found`);

    try {
      await this.productRepository.save(product);

      return this.findOnePlain(id);
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const product: Product | undefined = await this.findOne(id);

    const deleteProduct = await this.productRepository.preload({
      ...product,
      isActive: false,
    });

    if (!deleteProduct) return;

    try {
      await this.productRepository.save(deleteProduct);
    } catch (error) {
      handleExceptions(error, this.logger);
    }

    return deleteProduct;
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
