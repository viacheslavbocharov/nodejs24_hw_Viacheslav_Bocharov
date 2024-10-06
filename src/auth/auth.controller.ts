import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-input.dto';
import { SignInAuthDto } from '../auth/dto/signin-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './interface/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: RequestWithUser) {
    this.authService.logout(req.user.userId);
  }

  // @Post('refresh')
  // refresh(@Body() body: { refreshToken: string }) {
  //   // Логика обновления access token с помощью refresh token
  //   return { accessToken: 'newAccessToken' };
  // }

  // @UseGuards(AuthGuard('jwt-refresh'))
  // @Post('refresh')
  // refreshTokens(@Req() req: RequestWithUser) {
  //   const userId = req.user['sub'];
  //   const refreshToken = req.user['refreshToken'];
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
