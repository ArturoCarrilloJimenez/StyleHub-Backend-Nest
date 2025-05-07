import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProductEntity } from './order-product.entity';
import { OrderStatus } from '../interfaces/order.interfaces';
import { User } from 'src/auth/entities/auth.entity';

@Entity({ name: 'order_user' })
export class OrderUserEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.order, {
    onDelete: 'NO ACTION',
  })
  user: User;

  @ApiProperty()
  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    onDelete: 'NO ACTION',
  })
  orderProduct: OrderProductEntity;

  @ApiProperty()
  @Column('enum', {
    enum: OrderStatus,
    default: OrderStatus['CREATE'],
  })
  status: string;

  @ApiProperty()
  @Column('float')
  logisticsCosts: number;

  @ApiProperty()
  @Column('text')
  mailingAddress: string;
}
