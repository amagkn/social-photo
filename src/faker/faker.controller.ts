import { Controller, Delete, Post, Query } from '@nestjs/common';
import { FakerService } from 'src/faker/faker.service';

@Controller('faker')
export class FakerController {
  defaultCount = 5;

  constructor(private fakerService: FakerService) {}

  @Post('/seed/user')
  async seedUsers(@Query('count') count: string) {
    const result = await this.fakerService.seedUsers(
      isNaN(+count) ? this.defaultCount : +count,
    );

    return result;
  }

  @Delete('/user')
  async deleteUsers() {
    await this.fakerService.clearUsers();
  }
}
