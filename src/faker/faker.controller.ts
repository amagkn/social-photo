import { Controller, Post, Query } from '@nestjs/common';
import { FakerService } from 'src/faker/faker.service';

@Controller('faker')
export class FakerController {
  defaultCount = 5;

  constructor(private fakerService: FakerService) {}

  @Post('/seed/user')
  async seedUser(@Query('count') count: string) {
    const result = await this.fakerService.seedUser(
      isNaN(+count) ? this.defaultCount : +count,
    );

    return result;
  }
}
