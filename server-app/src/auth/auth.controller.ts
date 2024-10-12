import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
// import { Request } from 'express';
import { CustomRequest } from '../common/interfaces/custom-request.interface';
import { AuthService } from './auth.service';
import { SignInUserInputDto } from './dto/sign-in-user-input.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() signUpUserDto: CreateUserInputDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('sign-in')
  async signin(@Body() signInUserDto: SignInUserInputDto) {
    return this.authService.signIn(signInUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Req() req: CustomRequest) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: CustomRequest) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
