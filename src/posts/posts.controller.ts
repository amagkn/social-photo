import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';

@Controller('posts')
export class PostsController {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private postsService: PostsService,
  ) {}

  @Get()
  async findUserPosts(@Query('userId') userId: number) {
    const qb = await this.postsRepository
      .createQueryBuilder('posts')
      .limit(10)
      .leftJoinAndSelect('posts.user', 'users')
      .where('users.id = :userId', { userId });

    const items = await qb.getMany();
    const total = await qb.getCount();

    return { items, total };
  }
}
