import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  bio: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(200)
  avatar: string;

  @ValidateIf((o) => !o.email)
  @IsPhoneNumber()
  @MaxLength(25)
  phone: string;

  @ValidateIf((o) => !o.phone)
  @IsEmail()
  @MaxLength(40)
  email: string;
}
