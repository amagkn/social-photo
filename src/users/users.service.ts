import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/users/dtos/find-all-users.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
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

    const qb = this.usersRepository
      .createQueryBuilder('users')
      .where(whereCondition, { username, email })
      .offset(offset)
      .limit(limit);

    const items = await qb.getMany();
    const total = await qb.getCount();

    return { items, total };
  }
  async createUser(createUserDto: CreateUserDto) {
    const result = await this.usersRepository
      .createQueryBuilder('users')
      .insert()
      .values(createUserDto)
      .execute();

    const createdUser = await this.findUser(result.identifiers[0].id);

    return createdUser;
  }

  async deleteUser(id: number) {
    const result = await this.usersRepository
      .createQueryBuilder('users')
      .delete()
      .where('id = :id', { id })
      .execute();

    return result;
  }

  async findUser(id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('id = :id', { id })
      .getOne();

    return user;
  }
}
