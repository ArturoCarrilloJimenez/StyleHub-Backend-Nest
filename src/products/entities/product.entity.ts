import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ValidGender, ValidSizes } from '../interfaces/product.interface';
import { ProductType } from '../type/entities/product-type.entity';
import { ProductTags } from './product-tags.entity';

@Entity({ name: 'product' })
export class Product {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({ required: false, default: 0 })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({ required: false })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({ required: false, default: 0 })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty()
  @Column('enum', {
    enum: ValidSizes,
    array: true,
    default: [],
  })
  sizes: string[];

  @ApiProperty()
  @Column('enum', {
    enum: ValidGender,
    default: ValidGender['unisex'],
  })
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: [],
  })
  images: string[];

  @ApiProperty()
  @Column('boolean', { default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ApiProperty()
  @ManyToOne(() => ProductType, (type) => type.product)
  type: ProductType;

  @ApiProperty({ required: false, default: [] })
  @ManyToMany(() => ProductTags, (product) => product.product)
  tags: ProductTags[];

  @ApiProperty()
  @CreateDateColumn()
  insertDate: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateDate: Date;

  @BeforeInsert()
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
