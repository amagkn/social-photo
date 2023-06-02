import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAllUsers() {
    const result = await this.usersService.findAllUsers();

    return result;
  }
}
