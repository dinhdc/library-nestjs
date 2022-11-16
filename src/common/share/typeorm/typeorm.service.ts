import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigSerivce implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get<string>('MYSQL_HOST', 'localhost'),
      port: this.config.get<number>('MYSQL_PORT'),
      username: this.config.get<string>('MYSQL_USERNAME'),
      password: this.config.get<string>('MYSQL_PASSWORD'),
      database: this.config.get<string>('MYSQL_DATABASE'),
      // database: 'uploads',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
