import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UsersService {
  usersQueryBuilder: SelectQueryBuilder<User>;

  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    this.usersQueryBuilder = usersRepository.createQueryBuilder('users');
  }
  async findAllUsers(offset: number, limit: number) {
    const qb = this.usersQueryBuilder.offset(offset).limit(limit);

    const data = await qb.getMany();
    const total = await qb.getCount();

    return { data, total };
  }
  async createUser(createUserDto: CreateUserDto) {
    const qb = this.usersQueryBuilder.insert().values(createUserDto);

    const result = await qb.execute();

    const createdUser = await this.usersQueryBuilder
      .where('users.id = :id', {
        id: result.identifiers[0].id,
      })
      .getOne();

    return createdUser;
  }
}
