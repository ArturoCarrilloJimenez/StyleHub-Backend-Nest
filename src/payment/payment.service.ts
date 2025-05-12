import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/auth/entities/auth.entity';
import { Cart } from 'src/cart/entities';
import { OrderPaymentDto } from 'src/order/dto/order-payment.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripeClient: Stripe,
    private readonly configService: ConfigService,
  ) {}

  async createSessionPayment(
    cart: Cart,
    user: User,
    orderPaymentDto: OrderPaymentDto,
  ) {
    const line_items = this.prepareListProduct(cart);

    const session = await this.stripeClient.checkout.sessions.create({
      line_items,
      customer_email: user.email,
      shipping_address_collection: {
        allowed_countries: ['ES'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Estándar',
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500,
              currency: 'eur',
            },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      mode: 'payment',
      payment_method_types: ['card', 'paypal', 'sepa_debit'],
      success_url: orderPaymentDto.urlAcceptPayment,
      cancel_url: orderPaymentDto.urlCancelPayment,
    });

    return session;
  }

  private prepareListProduct(cart: Cart) {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    cart.products.map((cartProduct) => {
      const urlImages: string[] = [];

      cartProduct.product.images.map((image) => {
        urlImages.push(
          `${this.configService.get('HOST_API')}files/product/${image}`,
        );
      });

      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: cartProduct.product.title,
            images: urlImages,
            description: cartProduct.product.description,
          },
          unit_amount: cartProduct.product.price * 100,
        },
        quantity: cartProduct.quantity,
      });
    });

    return line_items;
  }
}
