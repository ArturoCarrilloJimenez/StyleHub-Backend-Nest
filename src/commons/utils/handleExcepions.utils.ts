import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleExceptions = (error, logger): never => {
  logger.error(error);

  switch (error.code) {
    case '23505':
      throw new BadRequestException(error.detail);
    case '22P02':
      throw new BadRequestException('Invalid format of UUID');
    default:
      throw new InternalServerErrorException(
        'Error - not found, check server log',
      );
  }
};
