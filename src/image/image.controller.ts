import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { Image } from './entities/image.entity';
import {
  editFileName,
  imageFileFilter,
} from 'src/common/utils/file-upload.utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('photo', { dest: './uploads' }))
  // uploadSingle(@UploadedFile() file) {
  //   console.log(file);
  // }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('photos[]', 10, { dest: './uploads' }))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }
}
