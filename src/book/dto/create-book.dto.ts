import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Catagory } from 'src/common/enum/type.enum';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNumber()
  catagory: Catagory;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  numberPage: number;
}
