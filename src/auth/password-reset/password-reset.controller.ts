import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ResetPasswordService } from './password-reset.service';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth/reset-password')
export class ResetPasswordController {
  constructor(private readonly passwordResetService: ResetPasswordService) {}

  @Post()
  async requestPasswordReset(
    @Body() requestPasswordReset: RequestPasswordResetDto,
  ) {
    return await this.passwordResetService.request(requestPasswordReset);
  }

  @Post(':id')
  async resetPassword(
    @Param('id') id: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.passwordResetService.reset(id, resetPasswordDto);
  }

  @Get(':id')
  async checkResetPassword(@Param('id', ParseUUIDPipe) id: string) {
    return await this.passwordResetService.check(id);
  }
}
