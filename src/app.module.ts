import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';

import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

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
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    ProductsModule,

    SeedModule,

    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
