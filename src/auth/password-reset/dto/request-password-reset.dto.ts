import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
