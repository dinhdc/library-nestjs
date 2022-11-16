import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { AbilityModule } from 'src/ability/ability.module';
import { UserModule } from 'src/user/user.module';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    AbilityModule,
    forwardRef(() => UserModule),
    MulterModule.register({
      dest: './files',
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'files'),
    // }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
