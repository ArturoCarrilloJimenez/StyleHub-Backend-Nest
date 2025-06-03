import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';

import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { ProductType } from './products/type/entities';
import { ProductTypeModule } from './products/type/product-type.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from './webhook/stripe/stripe.module';
import { EmailModule } from './seen-message/email/email.module';
import { EmailService } from './seen-message/email/email.service';
import { PasswordReset } from './auth/password-reset/entities/password-reset.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: false, // Clever Cloud suele requerir SSL
      },
      // Exporto con una expresión los entities para ahorrarme el tiempo de configurar uno a uno a mano
      entities: [
        __dirname + '/**/entities/*.entity{.ts,.js}',
        ProductType,
        PasswordReset,
      ],
      synchronize: true,
    }),

    ProductTypeModule,

    ProductsModule,

    SeedModule,

    AuthModule,

    FilesModule,

    CartModule,

    OrderModule,

    PaymentModule,

    StripeModule,

    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
