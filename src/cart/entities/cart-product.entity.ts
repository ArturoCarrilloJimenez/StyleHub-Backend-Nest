import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/products/entities';
import { ValidSizes } from 'src/products/interfaces/product.interface';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cart_product' })
@Index('cart_product_unique', ['cart', 'product'], { unique: true })
export class CartProduct {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.cartProduct, {
    eager: true,
  })
  product: Product;

  @ApiProperty()
  @ManyToOne(() => Cart, (cart) => cart.products, {
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @ApiProperty()
  @Column('int', {
    default: 1,
  })
  quantity: number;

  @ApiProperty()
  @Column('enum', {
    enum: ValidSizes,
  })
  size: string;
}
