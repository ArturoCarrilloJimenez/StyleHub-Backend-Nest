import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces';
import { Product } from 'src/products/entities';
import { ApiProperty } from '@nestjs/swagger';
import { OrderUserEntity } from 'src/order/entities/order.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  fullName: string;

  @ApiProperty()
  @Column('boolean', { default: true })
  isActive: boolean;

  @ApiProperty()
  @Column('enum', {
    enum: ValidRoles,
    array: true,
    default: [ValidRoles['user']],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  productsInsert: Product[];

  @ApiProperty()
  @OneToMany(() => OrderUserEntity, (order) => order.user, {
    onDelete: 'NO ACTION',
  })
  order: OrderUserEntity;

  @ApiProperty()
  @CreateDateColumn()
  insertDate: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateDate: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
