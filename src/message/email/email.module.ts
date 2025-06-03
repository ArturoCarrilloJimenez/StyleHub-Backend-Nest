import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { EmailTemplate } from './templates/email.template.service';

@Module({
  providers: [EmailService, EmailTemplate],
  imports: [ConfigModule.forRoot()],
  exports: [EmailService, EmailTemplate],
})
export class EmailModule {}
