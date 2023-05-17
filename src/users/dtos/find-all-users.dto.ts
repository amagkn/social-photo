import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { toNumber } from 'src/common/helpers/cast.helper';

export class FindAllUsersDto {
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  @Min(1)
  offset: number;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number;
}
