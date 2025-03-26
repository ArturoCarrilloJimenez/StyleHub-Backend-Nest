import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiResponse } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, example: 'SEED EXECUTED' })
  @ApiResponse({ status: 400, description: 'Unauthorized or' })
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
