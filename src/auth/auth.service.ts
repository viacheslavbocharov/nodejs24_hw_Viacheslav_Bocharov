import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ICreateUserInput } from 'src/users/interfaces/create-user-input.interface';
import { ISignInUserInput } from './interface/sign-in-user.interface';
import { ISignUpUserResponse } from './interface/sign-up-user-response.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(body: ICreateUserInput): Promise<ISignUpUserResponse> {
    const { firstName, lastName, age, isStudent, email, password } = body;

    this.logger.log(`Going to sign up new user with email: ${email}`);

    const user = this.usersService.findOneWithoutExeption(email);

    if (user) {
      throw new BadRequestException(`User with email: ${email} already exists`);
    }

    // Hash password
    const hash = await this.hashData(password);

    const newUser = this.usersService.create({
      firstName,
      lastName,
      age,
      isStudent,
      email,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    this.logger.log(`User with email: ${newUser.email} successfully signed up`);

    return tokens;
  }

  async signIn(body: ISignInUserInput) {
    const { email, password } = body;

    const user = this.usersService.findOneByEmail(email);

    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await argon2.verify(user.password, password);

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number) {
    return this.usersService.findOneAndUpdate(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersService.findOneAndUpdate(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, email: string) {
    this.logger.log(`Going to generate tokens for user with email: ${email}`);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_SECRET_EXPIRE'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_SECRET_EXPIRE',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    this.logger.log(`Going to generate tokens for user with id: ${userId}`);

    const user = this.usersService.findOneById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.firstName);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
