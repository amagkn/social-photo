import { UserStatusType } from 'src/users/types/user-status.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 400, nullable: true })
  bio: string;

  @Column({ length: 200, nullable: true })
  avatar: string;

  @Column({ length: 25, nullable: true })
  phone: string;

  @Column({ length: 40, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  password: string;

  @Column({ nullable: true })
  status: UserStatusType;
}
