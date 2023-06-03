import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

export class FakerService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async seedUsers(count = 0) {
    const fakeUsers: CreateUserDto[] = [];

    for (let i = 0; i < count; i++) {
      const user = new CreateUserDto();

      user.username = faker.internet.userName();
      user.password = faker.internet.password({ length: 10 });
      user.bio = faker.person.bio();
      user.email = faker.internet.email();
      user.avatar = faker.internet.avatar();
      user.phone = faker.phone.number();

      const errors = await validate(user);

      if (errors.length > 0) {
        throw new BadRequestException(errors.map((e) => e.constraints));
      }

      fakeUsers.push(user);
    }

    return this.userRepository.save(fakeUsers);
  }

  async clearUsers() {
    await this.userRepository.clear();
  }
}
