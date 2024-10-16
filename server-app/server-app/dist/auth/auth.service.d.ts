import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ICreateUserInput } from 'src/users/interfaces/create-user-input.interface';
import { ISignInUserInput } from './interface/sign-in-user.interface';
import { ISignUpUserResponse } from './interface/sign-up-user-response.interface';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly usersService;
    private readonly logger;
    constructor(jwtService: JwtService, configService: ConfigService, usersService: UsersService);
    signUp(body: ICreateUserInput): Promise<ISignUpUserResponse>;
    signIn(body: ISignInUserInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: number): Promise<import("../users/interfaces/user.interface").IUser>;
    hashData(data: string): Promise<string>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    getTokens(userId: number, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(userId: number, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
