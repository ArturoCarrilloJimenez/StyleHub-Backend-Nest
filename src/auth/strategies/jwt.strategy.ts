import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/auth/entities/auth.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    configsService: ConfigService,
  ) {
    const jwtSecret: string | undefined = configsService.get('JWT_SECRET');

    if (!jwtSecret)
      throw new InternalServerErrorException(
        'Internal server error, view server log',
      );

    super({
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { id } = payload;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }
}
