import { Module } from '@nestjs/common';
import { EncryptingData } from './encriptData.utils';

@Module({
  imports: [],
  providers: [EncryptingData],
  controllers: [],
  exports: [EncryptingData],
})
export class UtilsModule {}
