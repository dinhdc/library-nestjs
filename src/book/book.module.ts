import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => ImageModule)],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
