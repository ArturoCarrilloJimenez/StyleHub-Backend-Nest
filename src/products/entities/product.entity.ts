import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product.image.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (images) => images.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

  @BeforeInsert() // Método para realizar acciones después de la inserción
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugIUpdate() {
    this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
  }
}
