import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from 'schemas/user.schema';
import { CurrentUser } from 'src/users/users.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() signUpDto: User) {
    return this.authService.register(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('onboard')
  onboard(@Body() signUpDto: User) {
    return this.authService.onboard(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: User) {
    return this.authService.signIn(signInDto);
  }

  @Get('check-user')
  checkUser(@Headers() headers) {
    return this.authService.checkUser(headers);
  }

  @Get('check-exist')
  checkUserExist(@Query() user) {
    return this.authService.checkUserExist(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return this.authService.getUserProfile(user);
  }
}
