import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from 'src/hashtags/entities/hashtag.entity';
import { Repository } from 'typeorm';

@Controller('hashtags')
export class HashtagsController {
  constructor(
    @InjectRepository(Hashtag) private hashtagsRepository: Repository<Hashtag>,
  ) {}
  @Get()
  async findAll(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ) {
    return this.hashtagsRepository
      .createQueryBuilder('hashtags')
      .offset(offset ? Number(offset) : 0)
      .limit(limit ? Number(limit) : 100)
      .getMany();
  }
}
