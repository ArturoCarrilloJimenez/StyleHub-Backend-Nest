import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { EmailTemplateService } from './templates/email.template.service';

@Module({
  providers: [EmailService, EmailTemplateService],
  imports: [ConfigModule.forRoot()],
  exports: [EmailService, EmailTemplateService],
})
export class EmailModule {}
