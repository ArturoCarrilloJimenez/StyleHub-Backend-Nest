import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,
    private readonly configService: ConfigService,
  ) {}

  webhookStripePayment(body: any, sig: string) {
    const endpointSecret =
      this.configService.get<string>('STRIPE_WEBHOOK_SECRET') ?? '';

    try {
      // Verificar la firma del evento
      const event = this.stripeClient.webhooks.constructEvent(
        body,
        sig,
        endpointSecret,
      );

      // Procesar el evento según su tipo
      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          console.log(event);
          break;
        case 'checkout.session.async_payment_succeeded':
          console.log(event);
          break;
        case 'checkout.session.completed':
          console.log(event);
          break;
        case 'checkout.session.expired':
          console.log(event);
          break;
        default:
          console.log(`Evento no procesado: ${event.type}`);
      }
    } catch (err: any) {
      console.error('Error verificando la firma: ', err.message);
      throw new Error('Webhook signature verification failed');
    }
  }
}
