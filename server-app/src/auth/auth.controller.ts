import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CustomRequest } from '../common/interfaces/custom-request.interface';
import { AuthService } from './auth.service';
import { SignInUserInputDto } from './dto/sign-in-user-input.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'User registration' }) // Краткое описание метода
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: CreateUserInputDto })
  async signup(@Body() signUpUserDto: CreateUserInputDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: SignInUserInputDto })
  async signin(@Body() signInUserDto: SignInUserInputDto) {
    return this.authService.signIn(signInUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Req() req: CustomRequest) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh user tokens' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  refreshTokens(@Req() req: CustomRequest) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
