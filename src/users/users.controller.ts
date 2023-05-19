import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { serializeToDto } from 'src/common/helpers/serialize-to-dto.helper';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/users/dtos/find-all-users.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAllUsers(
    @Query() query: FindAllUsersDto,
  ): Promise<{ items: User[]; total: number }> {
    const result = await this.usersService.findAllUsers(query);

    result.items = result.items.map((user) => serializeToDto(UserDto, user));

    return result;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.usersService.createUser(createUserDto);

    return serializeToDto(UserDto, createdUser);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    const result = await this.usersService.deleteUser(id);

    if (!result.affected) {
      throw new BadRequestException('user not found');
    }

    return;
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    const user = await this.usersService.findUser(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return serializeToDto(UserDto, user);
  }
}
