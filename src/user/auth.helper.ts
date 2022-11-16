import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthHelper {
  private logger = new Logger('AuthHelper');

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get Account by Account ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne({
      where: {
        id: decoded.id,
      },
    });
  }

  // Generate JWT Token
  public generateToken(user: User): string {
    this.logger.debug(`Generated JWT Token`);

    const accessToken = this.jwt.sign({ id: user.id, email: user.email });
    return accessToken;
  }

  // Validate Account's password
  public isPasswordValid(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode Account's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
