import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto.';
import { SignupDto } from './dto/signup.dto';
import IsPublic from 'src/shared/decorators/isPublic/isPublic.decorator';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() createAuthDto: SigninDto) {
    return this.authService.signin(createAuthDto);
  }

  @Post('signup')
  signup(@Body() createAuthDto: SignupDto) {
    return this.authService.signup(createAuthDto);
  }
}
