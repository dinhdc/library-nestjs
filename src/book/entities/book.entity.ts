import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Catagory } from 'src/common/enum/type.enum';
import { Image } from 'src/image/entities/image.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  bookcode: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  catagory: Catagory;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  numberPage: number;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;
}
