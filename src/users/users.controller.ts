import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { serializeToDto } from 'src/common/helpers/serialize-to-dto.helper';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/users/dtos/find-all-users.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAllUsers(
    @Query() query: FindAllUsersDto,
  ): Promise<{ data: User[]; total: number }> {
    const result = await this.usersService.findAllUsers(
      query.offset,
      query.limit,
    );

    return result;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.usersService.createUser(createUserDto);

    return serializeToDto(UserDto, createdUser);
  }
}
