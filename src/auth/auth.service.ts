import {
  Injectable,
  UnauthorizedException,
  Logger,
  // ForbiddenException,
} from '@nestjs/common';
// import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user-input.dto';
import { SignInAuthDto } from '../auth/dto/signin-auth.dto';
// import * as bcrypt from 'bcryptjs';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async signIn(signInAuthDto: SignInAuthDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByUserName(
      signInAuthDto.userName,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    if (!(user.password === signInAuthDto.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { username: user.firstName, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async logout(userId: number) {
    return this.usersService.findOneAndUpdate(userId, { accessToken: null });
  }
}
