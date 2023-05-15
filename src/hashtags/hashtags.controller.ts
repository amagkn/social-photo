import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from 'src/hashtags/hashtag.entity';
import { Repository } from 'typeorm';

@Controller('hashtags')
export class HashtagsController {
  constructor(
    @InjectRepository(Hashtag) private hashtagsRepository: Repository<Hashtag>,
  ) {}
  @Get()
  getAll() {
    return this.hashtagsRepository.find();
  }
}
