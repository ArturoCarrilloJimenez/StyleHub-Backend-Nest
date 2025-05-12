import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class OrderPaymentDto {
  @ApiProperty()
  @IsUrl({ require_tld: false })
  urlAcceptPayment: string;

  @ApiProperty()
  @IsUrl({ require_tld: false })
  urlCancelPayment: string;
}
