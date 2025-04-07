import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductType } from '../type/entities/product-type.entity';
import { Product } from '.';

@Entity({ name: 'product-tags' })
export class ProductTags {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  name: string;

  @ManyToOne(() => ProductType, (type) => type.tags)
  type: ProductType;

  @ManyToMany(() => Product, (product) => product.tags)
  product: Product[];
}
