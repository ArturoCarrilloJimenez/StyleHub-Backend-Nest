import { Module } from '@nestjs/common';
import { ResetPasswordService } from './password-reset.service';
import { ResetPasswordController } from './password-reset.controller';
import { EmailModule } from 'src/message/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/auth.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { UtilsModule } from 'src/commons/utils/utils.module';

@Module({
  controllers: [ResetPasswordController],
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity, PasswordReset]),
    UtilsModule,
  ],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
