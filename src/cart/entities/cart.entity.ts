import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/auth.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartProduct } from './cart-product.entity';

@Entity({ name: 'shopping_cart' })
export class Cart {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartProduct, (cart) => cart.cart, {
    cascade: true,
    orphanedRowAction: 'delete',
    eager: true,
  })
  products: CartProduct[];

  @ApiProperty()
  @CreateDateColumn()
  insertDate: Date;
}
