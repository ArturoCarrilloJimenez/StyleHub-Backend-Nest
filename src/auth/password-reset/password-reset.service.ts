import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { EmailService } from 'src/seen-message/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { PasswordReset } from './entities/password-reset.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EncryptingData } from 'src/commons/utils/encriptData.utils';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,

    private readonly emailService: EmailService,

    private readonly encryptData: EncryptingData,
  ) {}

  async request({ email }: RequestPasswordResetDto) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user)
      throw new BadRequestException(
        `The user with the email ${email} does not exist, check that it is correct or try again later.`,
      );

    const passwordReset = this.passwordResetRepository.create({
      user,
    });

    try {
      await this.passwordResetRepository.save(passwordReset);
    } catch (error) {
      throw new NotFoundException(
        'Something went wrong while trying to recover your password, please try again later.',
      );
    }

    await this.emailService.send({
      to: `StyleHub <${email}>`,
      subject: 'prueba',
      htmlBody: `Prueba de recuperar contraseña ${passwordReset.id}`,
    });

    return { sendEmail: true };
  }

  async reset(id: string, { password }: ResetPasswordDto) {
    const passwordReset = await this.passwordResetRepository.findOneBy({ id });

    if (!passwordReset)
      throw new BadRequestException(
        `Token ${id} does not exist, please check if it is correct or try again later.`,
      );

    if (
      passwordReset.isOpen ||
      passwordReset.expiredData.getTime() >= new Date().getTime()
    )
      throw new NotFoundException(
        'This token has already been used or has already expired',
      );

    await this.openPasswordReset(id);
    await this.modifyPassword(password, passwordReset);

    return { modifyPassword: true };
  }

  private async openPasswordReset(id: string) {
    const passwordReset = await this.passwordResetRepository.preload({
      id,
      isOpen: true,
    });

    if (!passwordReset)
      throw new BadRequestException(
        `Token ${id} does not exist, please check if it is correct or try again later.`,
      );

    try {
      await this.passwordResetRepository.save(passwordReset);
    } catch (error) {
      throw new NotFoundException(
        'Something went wrong while trying to recover your password, please try again later.',
      );
    }
  }

  private async modifyPassword(password: string, passwordReset: PasswordReset) {
    const user = await this.userRepository.preload({
      id: passwordReset.user.id,
      password: this.encryptData.encrypt(password),
    });

    if (!user)
      throw new NotFoundException(
        'Something went wrong when trying to change your password, please try again later.',
      );

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(
        'Something went wrong when trying to change your password, please try again later.',
      );
    }
  }
}
