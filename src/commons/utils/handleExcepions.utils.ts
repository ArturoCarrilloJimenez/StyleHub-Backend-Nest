import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleExceptions = (error, logger): never => {
  logger.error(error);

  if (error.code == 23505) throw new BadRequestException(error.detail);
  if (error.code == '22P02')
    throw new BadRequestException('Invalid format of UUID');

  throw new InternalServerErrorException('Error - not found, check server log');
};
