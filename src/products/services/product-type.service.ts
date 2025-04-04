import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from '../entities';
import { Repository } from 'typeorm';

@Injectable() // TODO Mirar como funciona TypeOrmCrudService
export class ProductTypeService extends TypeOrmCrudService<ProductType> {
  constructor(@InjectRepository(ProductType) repo: Repository<ProductType>) {
    super(repo)
  }
}
