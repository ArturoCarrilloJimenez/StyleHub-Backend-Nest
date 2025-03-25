import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';

import * as bcrypt from 'bcrypt';
import { handleExceptions } from 'src/commons/utils/handleExcepions.utils';
import { CreateUserDto, LoginUserDto } from './dto/';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userDto } = createUserDto;

    try {
      const user = this.userRepository.create({
        ...userDto,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      return { ...user, token: this.getJwtToken({ email: user.email }) };
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const lowerEmail = email.toLowerCase().trim();

    const user = await this.userRepository.findOne({
      where: { email: lowerEmail },
      select: { email: true, password: true },
    });

    if (!user)
      throw new UnauthorizedException('Credential are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credential are not valid (password)');

    return { ...user, token: this.getJwtToken({ email: user.email }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
