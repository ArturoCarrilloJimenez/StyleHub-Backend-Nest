import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/auth/entities/auth.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'forgot_password' })
export class PasswordReset {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.passwordResets, { eager: false })
  user: UserEntity;

  @ApiProperty()
  @Column('date')
  expiredData: Date;

  @ApiProperty()
  @CreateDateColumn()
  insertDate: Date;

  @BeforeInsert()
  generateExpiredDate() {
    this.expiredData = new Date(this.insertDate.getTime() + 30 * 60 * 1000);
  }
}
