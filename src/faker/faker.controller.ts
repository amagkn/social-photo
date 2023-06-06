import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FakerService } from 'src/faker/faker.service';

@Controller('faker')
export class FakerController {
  constructor(private fakerService: FakerService) {}

  @Post('/seed/user')
  async seedUsers(
    @Query('count', new DefaultValuePipe(5), ParseIntPipe)
    count: number,
  ) {
    const result = await this.fakerService.seedUsers(count);

    return result;
  }

  @Delete('/user')
  async deleteUsers() {
    await this.fakerService.clearUsers();
  }

  @Get('sandbox')
  async sandbox() {
    return 'sandbox';
  }
}
