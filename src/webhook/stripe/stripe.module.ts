import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { OrderModule } from 'src/order/order.module';

@Module({
  controllers: [StripeController],
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: (config: ConfigService) => {
        return new Stripe(config.get<string>('STRIPE_SECRET_KEY') ?? '', {
          apiVersion: '2025-04-30.basil',
        });
      },
      inject: [ConfigService],
    },
    StripeService,
  ],
  imports: [ConfigModule.forRoot(), OrderModule],
})
export class StripeModule {}
