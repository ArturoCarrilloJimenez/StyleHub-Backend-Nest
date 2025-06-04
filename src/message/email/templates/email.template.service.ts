import { ConfigService } from '@nestjs/config';
import { emailResetPasswordTemplate, emailAccountActivationTemplate } from './';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplate {
  constructor(private readonly configService: ConfigService) {}

  emailTemplate(
    type: 'reset-password' | 'active-account',
    userName: string,
    idResetPassword: string,
  ) {
    let template = '';

    switch (type) {
      case 'reset-password':
        template = emailResetPasswordTemplate;
        break;

      case 'active-account':
        template = emailAccountActivationTemplate;
        break;

      default:
        break;
    }

    return template
      .replace(/\$\{user_name\}/g, userName)
      .replace(
        /\$\{link_reset_password\}/g,
        `${this.configService.get('HOST_FRONT')}${idResetPassword}`,
      )
      .replace(/\$\{link_front\}/g, `${this.configService.get('HOST_FRONT')}`);
  }
}
