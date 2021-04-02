import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { FindConditions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findBy(
    findCondition: string | FindConditions<User> | FindConditions<User>[],
  ) {
    return this.userRepository.findOne({
      where: findCondition,
    });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async create(user: CreateUserDto): Promise<UpdateUserDto> {
    const { password, ...result } = await this.userRepository.save(
      this.userRepository.create(user),
    );
    return result;
  }

  update(id: number, user: UpdateUserDto) {
    return this.userRepository.update(id, user);
  }

  async comparePassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }
}
