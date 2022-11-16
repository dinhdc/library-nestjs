import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/image/image.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @Inject(forwardRef(() => ImageService))
    private cartService: ImageService,
  ) {}
  async create(createBookDto: CreateBookDto) {
    return await this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(bookcode: number) {
    const book = await this.bookRepository.findOne({ where: { bookcode } });
    if (!book) {
      throw new NotFoundException(`book with ID: ${bookcode} not found`);
    }
    return book;
  }

  async update(bookcode: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { bookcode } });
    if (!book) {
      throw new HttpException('Not found book', HttpStatus.NOT_FOUND);
    }
    await this.bookRepository.update({ bookcode }, updateBookDto);
    return {
      message: 'Update successfully',
    };
  }

  async remove(bookcode: number) {
    const book = await this.bookRepository.findOne({ where: { bookcode } });
    if (!book) {
      throw new HttpException('Not found book', HttpStatus.NOT_FOUND);
    }
    await this.bookRepository.delete({ bookcode });
    return {
      message: 'Delete successfully',
    };
  }
}
