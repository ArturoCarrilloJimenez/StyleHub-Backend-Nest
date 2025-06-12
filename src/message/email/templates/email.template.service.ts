import { ConfigService } from '@nestjs/config';
import {
  emailResetPasswordTemplate,
  emailAccountActivationTemplate,
  emailInvoiceItemTemplate,
  emailInvoiceTemplate,
} from './';
import { Injectable } from '@nestjs/common';
import { OrderUserEntity } from 'src/order/entities/order.entity';

type EmailTemplateType = 'reset-password' | 'active-account' | 'invoice';

@Injectable()
export class EmailTemplateService {
  constructor(private readonly configService: ConfigService) {}

  createTemplate(type: EmailTemplateType, userName: string): any {
    const host = `${this.configService.get('HOST_FRONT')}`;

    switch (type) {
      case 'reset-password':
        return (idResetPassword: string) => {
          return this.setCommonTemplateValues(
            emailResetPasswordTemplate,
            userName,
            host,
          ).replace(/\$\{link_reset_password\}/g, `${host}${idResetPassword}`);
        };

      case 'active-account':
        return () => {
          return this.setCommonTemplateValues(
            emailAccountActivationTemplate,
            userName,
            host,
          ).replace(/\$\{activation_link\}/g, ``);
        };

      case 'invoice':
        return (order: OrderUserEntity) => {
          const { orderProducts, total_amount, id, insertDate } = order;

          // Registros de productos
          const itemsHtml = orderProducts
            .map((item) =>
              emailInvoiceItemTemplate.replace(
                /\$\{item\}/g,
                item.product.title,
              ),
            )
            .join('');

          return this.setCommonTemplateValues(
            emailInvoiceTemplate,
            userName,
            host,
          )
            .replace(/\$\{items\}/g, itemsHtml)
            .replace(/\$\{total_amount\}/g, total_amount.toString())
            .replace(/\$\{order_number\}/g, id)
            .replace(/\$\{order_date\}/g, insertDate.toLocaleDateString());
        };

      default:
        throw new Error(`Unsupported email template type: ${type}`);
    }
  }

  private setCommonTemplateValues(
    template: string,
    userName: string,
    host: string,
  ): string {
    return template
      .replace(/\$\{user_name\}/g, userName)
      .replace(/\$\{host\}/g, host);
  }
}
