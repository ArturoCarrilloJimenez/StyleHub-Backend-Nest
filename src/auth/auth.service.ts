import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { CreateUserDto, LoginUserDto } from './dto/';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';
import { EncryptingData } from 'src/commons/utils/encriptData.utils';

// TODO realizar borrado lógico
// TODO realizar comprobación de que el email ya existe
// TODO realizar recuperar contraseña
@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly encryptData: EncryptingData,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userDto } = createUserDto;

    try {
      const user = this.userRepository.create({
        ...userDto,
        password: this.encryptData.encrypt(password),
      });

      await this.userRepository.save(user);

      return { user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const lowerEmail = email.toLowerCase().trim();

    const user = await this.userRepository.findOne({
      where: { email: lowerEmail },
      select: {
        email: true,
        password: true,
        id: true,
        fullName: true,
        isActive: true,
        roles: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('Credential are not valid (email)');

    if (!this.encryptData.isValidate(password, user.password))
      throw new UnauthorizedException('Credential are not valid (password)');

    if (!user.isActive)
      throw new UnauthorizedException(
        'User is inactive, send email whit admin',
      );

    return { user, token: this.getJwtToken({ id: user.id }) };
  }

  checkAuthStatus(user: User) {
    return { user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
