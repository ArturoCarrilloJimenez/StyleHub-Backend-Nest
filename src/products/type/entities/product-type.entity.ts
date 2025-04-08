import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../../entities';

@Entity({ name: 'product_type' })
export class ProductType {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.type)
  product: Product[];
}
