import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, Min } from 'class-validator';
import { toNumber } from 'src/common/helpers/cast.helper';

export class FindAllUsersDto {
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  username: string;
}
