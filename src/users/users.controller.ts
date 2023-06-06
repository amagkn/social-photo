import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAllUsers() {
    const result = await this.usersService.findAllUsers();

    return result;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }

  @Put()
  async updateUser(@Body() updateUserDto: any) {
    return 'ok';
  }
}
