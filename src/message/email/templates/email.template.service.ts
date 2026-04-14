import { ConfigService } from '@nestjs/config';
import {
  emailResetPasswordTemplate,
  emailAccountActivationTemplate,
  emailInvoiceItemTemplate,
  emailInvoiceTemplate,
} from './';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OrderUserEntity } from 'src/order/entities/order.entity';

type EmailTemplateType = 'reset-password' | 'active-account' | 'invoice';

@Injectable()
export class EmailTemplateService {
  private readonly logger = new Logger('EmailTemplateService');

  constructor(private readonly configService: ConfigService) {}

  createTemplate(
    type: EmailTemplateType,
    userName: string,
  ): (...args: any[]) => string {
    const host = `${this.configService.get('HOST_FRONT')}`;
    const hostApi = `${this.configService.get('HOST_API')}`;

    switch (type) {
      case 'reset-password':
        return (idResetPassword: string) => {
          try {
            return this.setCommonTemplateValues(
              emailResetPasswordTemplate,
              userName,
              host,
            ).replace(
              /\$\{link_reset_password\}/g,
              `${host}${idResetPassword}`,
            );
          } catch (error) {
            this.logger.error(
              `Failed to render reset-password email template: ${error instanceof Error ? error.message : error}`,
            );
            throw new InternalServerErrorException(
              'Failed to generate the password reset email. Please try again later.',
            );
          }
        };

      case 'active-account':
        return () => {
          try {
            return this.setCommonTemplateValues(
              emailAccountActivationTemplate,
              userName,
              host,
            ).replace(/\$\{activation_link\}/g, ``);
          } catch (error) {
            this.logger.error(
              `Failed to render active-account email template: ${error instanceof Error ? error.message : error}`,
            );
            throw new InternalServerErrorException(
              'Failed to generate the account activation email. Please try again later.',
            );
          }
        };

      case 'invoice':
        return (order: OrderUserEntity) => {
          try {
            const { orderProducts, total_amount, id, insertDate } = order;

            if (!orderProducts || orderProducts.length === 0) {
              this.logger.warn(
                `Invoice template rendered with no order products for order ${id}`,
              );
            }

            const itemsHtml = orderProducts
              .map((item) => {
                const productTitle = item.product?.title ?? 'Unknown Product';
                const productImage =
                  item.product?.images?.[0] ?? 'placeholder.png';
                const productPrice = item.product?.price ?? 0;

                return emailInvoiceItemTemplate
                  .replace(/\$\{item.name\}/g, productTitle)
                  .replace(
                    /\$\{item.image_url\}/g,
                    `${hostApi}files/product/${productImage}`,
                  )
                  .replace(/\$\{item.quantity\}/g, item.quantity.toString())
                  .replace(/\$\{item.unit_price\}/g, productPrice.toString())
                  .replace(/\$\{item.subtotal\}/g, item.totalPrice.toString());
              })
              .join('');

            return this.setCommonTemplateValues(
              emailInvoiceTemplate,
              userName,
              host,
            )
              .replace(/\$\{items\}/g, itemsHtml)
              .replace(/\$\{total_amount\}/g, total_amount.toString())
              .replace(/\$\{order_number\}/g, id)
              .replace(
                /\$\{order_date\}/g,
                insertDate
                  ? insertDate.toLocaleDateString()
                  : new Date().toLocaleDateString(),
              );
          } catch (error) {
            this.logger.error(
              `Failed to render invoice email template for order ${order?.id}: ${error instanceof Error ? error.message : error}`,
            );
            throw new InternalServerErrorException(
              'Failed to generate the invoice email. Please try again later.',
            );
          }
        };

      default:
        throw new InternalServerErrorException(
          'Unsupported email template type: ' + String(type),
        );
    }
  }

  private setCommonTemplateValues(
    template: string,
    userName: string,
    host: string,
  ): string {
    return template
      .replace(/\$\{user_name\}/g, userName)
      .replace(/\$\{link_front\}/g, host);
  }
}
