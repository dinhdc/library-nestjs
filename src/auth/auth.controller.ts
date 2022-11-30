import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  async singin(@Body() authcredentialDto: AuthCredentialDto) {
    return this.authService.login(authcredentialDto);
  }
}
