import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllUsersDto } from 'src/users/dtos/find-all-users.dto';
import { User } from 'src/users/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Controller('users')
export class UsersController {
  usersQueryBuilder: SelectQueryBuilder<User>;

  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    this.usersQueryBuilder = usersRepository.createQueryBuilder('users');
  }
  @Get()
  async findAll(@Query() query: FindAllUsersDto) {
    const qb = this.usersQueryBuilder.offset(query.offset).limit(query.limit);

    const data = await qb.getMany();
    const total = await qb.getCount();

    return { data, total };
  }
}
