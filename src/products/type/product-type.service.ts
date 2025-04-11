import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductType } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDto, UpdateProductTypeDto } from './dto';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';
import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductTypeService {
  private readonly logger = new Logger('ProductsTypeService');

  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    try {
      const type = this.productTypeRepository.create(createProductTypeDto);
      await this.productTypeRepository.save(type);

      return type;
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async findAll(paginateDto: PaginateDto) {
    const { limit = 12, page: offset = 0 } = paginateDto;

    const types = await this.productTypeRepository.find({
      take: limit,
      skip: offset,
      relations: {},
    });

    return types.map((types) => ({
      ...types,
    }));
  }

  async findOne(term: string) {
    let type: ProductType | null;

    if (isUUID(term)) {
      type = await this.productTypeRepository.findOneBy({ id: term });
    } else {
      const queryBuilder =
        this.productTypeRepository.createQueryBuilder('product-type');

      term = term.toLowerCase();

      type = await queryBuilder
        .where('LOWER (product-type.name) =:name', {
          name: term,
        })
        .getOne();
    }

    if (!type) throw new NotFoundException('This product type not found');

    return type;
  }

  async update(id: string, updateProductTypeDto: UpdateProductTypeDto) {
    const type = await this.productTypeRepository.preload({
      id: id,
      ...updateProductTypeDto,
    });

    if (!type) throw new NotFoundException(`Product whit id ${id} not found`);

    try {
      await this.productTypeRepository.save(type);

      return this.findOne(id);
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const type: ProductType | undefined = await this.findOne(id);

    if (!type) return;

    await this.productTypeRepository.remove(type);

    return type;
  }

  async removeAllProductTypes() {
    const query = this.productTypeRepository.createQueryBuilder();

    try {
      return await query.delete().execute();
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }
}
