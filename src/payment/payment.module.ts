import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Module({
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
    PaymentService,
  ],
  imports: [ConfigModule.forRoot()],
  exports: [PaymentService],
})
export class PaymentModule {}
