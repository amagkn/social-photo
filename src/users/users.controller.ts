import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(private configSerivice: ConfigService) {}
  @Get()
  getAllUsers() {
    console.log(
      this.configSerivice.get('DATABASE_USER'),
      this.configSerivice.get('DATABASE_PASSWORD'),
    );

    return 'Hello world';
  }
}
