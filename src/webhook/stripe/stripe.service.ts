import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderStatus } from 'src/order/interfaces/order.interfaces';
import { OrderService } from 'src/order/order.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger('StripeService');

  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,

    private readonly configService: ConfigService,

    private readonly orderService: OrderService,
  ) {}

  async webhookStripePayment(body: any, sig: string) {
    const endpointSecret =
      this.configService.get<string>('STRIPE_WEBHOOK_SECRET') ?? '';

    let event: Stripe.Event;

    try {
      // Verificar la firma del evento
      event = this.stripeClient.webhooks.constructEvent(
        body,
        sig,
        endpointSecret,
      );
    } catch (err) {
      this.logger.error(
        `Webhook signature verification failed: ${err instanceof Error ? err.message : err}`,
      );
      throw new Error('Webhook signature verification failed');
    }

    try {
      // Procesar el evento según su tipo
      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          await this.orderService.updateOrderStatusBySessionPayment(
            event.data.object.id,
            {
              status: OrderStatus['FAILED'],
            },
          );
          break;
        case 'checkout.session.async_payment_succeeded':
          await this.orderService.updateOrderStatusBySessionPayment(
            event.data.object.id,
            {
              paymentId: event.data.object.payment_intent as string,
              status: OrderStatus['SUCCESSFUL'],
            },
          );
          break;
        case 'checkout.session.completed':
          await this.orderService.updateOrderStatusBySessionPayment(
            event.data.object.id,
            {
              paymentId: event.data.object.payment_intent as string,
              status: OrderStatus['SUCCESSFUL'],
            },
          );
          break;
        case 'checkout.session.expired':
          await this.orderService.updateOrderStatusBySessionPayment(
            event.data.object.id,
            {
              status: OrderStatus['EXPIRED'],
            },
          );
          break;
        default:
          break;
      }
    } catch (err) {
      this.logger.error(
        `Error processing webhook event ${event.type}: ${err instanceof Error ? err.message : err}`,
      );
      throw err;
    }
  }
}
