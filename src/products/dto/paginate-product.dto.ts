// paginate-products.dto.ts
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';

export class PaginateProductsDto extends PaginateDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  activeProducts?: number;
}
