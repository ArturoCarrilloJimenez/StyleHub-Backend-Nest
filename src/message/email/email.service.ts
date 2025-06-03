import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';
import { SendMailOptions } from './interfaces/emails.interface';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  private transporter = nodeMailer.createTransport({
    service: this.configService.get('MAILER_SERVICE'),
    auth: {
      user: this.configService.get('MAILER_EMAIL'),
      pass: this.configService.get('MAILER_SECRET_KEY'),
    },
  });

  async send(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;
    try {
      await this.transporter.sendMail({
        from: `StyleHub <${this.configService.get('MAILER_EMAIL')}>`,
        to,
        subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch (error) {
      throw new NotFoundException(
        'The email could not be sent, please try again later.',
      );
    }
  }
}
