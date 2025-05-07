import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities';
import { ValidSizes } from 'src/products/interfaces/product.interface';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderUserEntity } from './order.entity';

@Entity({ name: 'order_product' })
export class OrderProductEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Product, {
    eager: true,
  })
  product: Product;

  @ApiProperty()
  @ManyToOne(() => OrderUserEntity, (order) => order.orderProduct, {
    onDelete: 'NO ACTION',
  })
  order: OrderUserEntity;

  @ApiProperty()
  @Column('float', {
    default: 1,
  })
  unitPrice: number;

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

  @BeforeInsert()
  chargeUnitPrice() {
    this.unitPrice = this.product.price;
  }

  @BeforeUpdate()
  chargeUnitPriceUpdate() {
    this.chargeUnitPrice();
  }
}
