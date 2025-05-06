import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';

export class QueryGetAllProduct extends PaginateDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  activeProducts?: boolean = true;
}
