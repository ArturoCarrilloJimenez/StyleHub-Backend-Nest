import {
  Controller,
  Post,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Webhook of stripe for payment')
@Controller('webhook/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  private readonly logger = new Logger(StripeController.name);

  @Post()
  webhookStripePayment(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      // Validar la firma del webhook
      this.stripeService.webhookStripePayment(req.rawBody, signature);
      return { received: true };
    } catch (error) {
      throw new HttpException(
        'Webhook signature verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
