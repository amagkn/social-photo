import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/users/dtos/find-all-users.dto';
import { User } from 'src/users/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UsersService {
  usersQueryBuilder: SelectQueryBuilder<User>;

  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    this.usersQueryBuilder = usersRepository.createQueryBuilder('users');
  }
  async findAllUsers(params: FindAllUsersDto) {
    const { offset = 0, limit = 50, username, email } = params;

    let whereCondition = '';

    if (username && email) {
      whereCondition = `username = :username AND email = :email`;
    } else if (username) {
      whereCondition = `username = :username`;
    } else if (email) {
      whereCondition = `email = :email`;
    }

    const qb = this.usersQueryBuilder
      .where(whereCondition, { username, email })
      .offset(offset)
      .limit(limit);

    const items = await qb.getMany();
    const total = await qb.getCount();

    return { items, total };
  }
  async createUser(createUserDto: CreateUserDto) {
    const result = await this.usersQueryBuilder
      .insert()
      .values(createUserDto)
      .execute();

    const createdUser = await this.findUser(result.identifiers[0].id);

    return createdUser;
  }

  async deleteUser(id: number) {
    const result = await this.usersQueryBuilder
      .delete()
      .where('id = :id', { id })
      .execute();

    return result;
  }

  async findUser(id: number) {
    const user = await this.usersQueryBuilder
      .where('id = :id', { id })
      .getOne();

    return user;
  }
}
