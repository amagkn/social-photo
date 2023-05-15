import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from 'src/hashtags/hashtag.entity';

import { HashtagsController } from './hashtags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [HashtagsController],
})
export class HashtagsModule {}
