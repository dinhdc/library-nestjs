import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Inject,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
  ) {}

  private logger = new Logger('UserService');

  async create(createUserDto: CreateUserDto) {
    const user: User = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const username: User = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (user || username) {
      throw new HttpException(
        'This user already exists in the system',
        HttpStatus.CONFLICT,
      );
    }

    createUserDto.password = this.helper.encodePassword(createUserDto.password);
    this.logger.verbose(
      `New user in system with email is: ${createUserDto.email.toLowerCase()}`,
    );
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`user with ID: ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const book = await this.userRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException('Not found book', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update({ id }, updateUserDto);
    return {
      message: 'Update successfully',
    };
  }

  async remove(id: number) {
    const book = await this.userRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete({ id });
    return {
      message: 'Delete successfully',
    };
  }
}
