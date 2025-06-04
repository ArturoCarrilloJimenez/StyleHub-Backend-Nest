import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from '../entities/auth.entity';

export const RowHeader = createParamDecorator(
  (data: string, cxt: ExecutionContext) => {
    const req = cxt.switchToHttp().getRequest();
    const rawHeaders: UserEntity | null = req.rawHeaders;

    if (!rawHeaders)
      throw new InternalServerErrorException('rawHeaders not found (request)');

    return !data ? rawHeaders : rawHeaders[data];
  },
);
