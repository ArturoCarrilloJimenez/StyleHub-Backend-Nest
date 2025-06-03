import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordService } from './password-reset.service';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';

@Controller('auth/reset-password')
export class ResetPasswordController {
  constructor(private readonly passwordResetService: ResetPasswordService) {}

  @Post('request')
  async requestPasswordReset(
    @Body() requestPasswordReset: RequestPasswordResetDto,
  ) {
    await this.passwordResetService.request(requestPasswordReset);
  }
}
