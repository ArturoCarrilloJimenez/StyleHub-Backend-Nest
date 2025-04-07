import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductTags } from '../../entities/product-tags.entity';
import { Product } from '../../entities';

@Entity({ name: 'product-type' })
export class ProductType {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  name: string;

  @OneToMany(() => ProductTags, (tags) => tags.type)
  tags: ProductTags[];

  @OneToMany(() => Product, (product) => product.type)
  product: Product[];
}
