import { Module } from '@nestjs/common';
import { ResetPasswordService } from './password-reset.service';
import { ResetPasswordController } from './password-reset.controller';
import { EmailModule } from 'src/seen-message/email/email.module';

@Module({
  controllers: [ResetPasswordController],
  imports: [EmailModule],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
