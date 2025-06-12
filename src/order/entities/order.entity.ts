import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProductEntity } from './order-product.entity';
import { OrderStatus } from '../interfaces/order.interfaces';
import { UserEntity } from 'src/auth/entities/auth.entity';

@Entity({ name: 'order_user' })
export class OrderUserEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.order, {
    onDelete: 'NO ACTION',
    eager: true,
  })
  user: UserEntity;

  @ApiProperty()
  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    onDelete: 'NO ACTION',
    eager: true,
  })
  orderProducts: OrderProductEntity[];

  @ApiProperty()
  @Column('float', {
    default: 0,
  })
  total_amount: number;

  @ApiProperty()
  @Column('enum', {
    enum: OrderStatus,
    default: OrderStatus['PENDING'],
  })
  status: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
    nullable: true,
  })
  sessionPaymentId: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
    nullable: true,
  })
  paymentId: string;

  @ApiProperty()
  @CreateDateColumn()
  insertDate: Date;
}
