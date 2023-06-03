import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';

import { FakerController } from './faker.controller';
import { FakerService } from './faker.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [FakerController],
  providers: [FakerService, CreateUserDto],
})
export class FakerModule {}
