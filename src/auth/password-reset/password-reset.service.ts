import { Injectable } from '@nestjs/common';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { EmailService } from 'src/seen-message/email/email.service';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly emailService: EmailService) {}

  async request({ email }: RequestPasswordResetDto) {
    await this.emailService.send({
      to: email,
      subject: 'prueba',
      htmlBody: 'esto es un mensaje de prueba',
    });
  }
}
