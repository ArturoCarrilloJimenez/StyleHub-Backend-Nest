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
import { paginateResponse } from 'src/commons/utils/paginate-response.utils';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly productTypeService: ProductTypeService,
  ) {}

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

  async findAll(paginateDto: PaginateDto, isActiveProducts: number = 1) {
    const { limit = 12, page = 0 } = paginateDto;
    const skip = (page - 1) * limit;

    const whereCondition = isActiveProducts !== 0 ? { isActive: true } : {};

    const data = await this.productRepository.findAndCount({
      take: limit,
      skip: skip,
      relations: {
        type: true,
      },
      where: whereCondition,
    });

    return paginateResponse(data, page, limit);
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
        .leftJoinAndSelect('product.type', 'prodType')
        .getOne();
    }

    if (!product) throw new NotFoundException('This product not found');

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

  async activeProduct(id: string, isActive: boolean = true) {
    const product: Product | undefined = await this.findOne(id);

    const activeProduct = await this.productRepository.preload({
      ...product,
      isActive,
    });

    if (!activeProduct) return;

    try {
      await this.productRepository.save(activeProduct);
    } catch (error) {
      handleExceptions(error, this.logger);
    }

    return activeProduct;
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
