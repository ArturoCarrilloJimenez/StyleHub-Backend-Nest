import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  ValidGender,
  ValidSizes,
  ValidTypes,
} from '../interfaces/product.interface';

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
    enum: ValidTypes,
    default: ValidTypes['shirts'],
  })
  type: string;

  @ApiProperty()
  @Column('enum', {
    enum: ValidGender,
    default: ValidGender['unisex'],
  })
  gender: string;

  @ApiProperty({ required: false, default: [] })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty()
  @Column('text', {
    array: true,
    default: [],
  })
  images: string[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;

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
