import { CustomRequest } from '../common/interfaces/custom-request.interface';
import { AuthService } from './auth.service';
import { SignInUserInputDto } from './dto/sign-in-user-input.dto';
import { CreateUserInputDto } from 'src/users/dto/create-user-input.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signUpUserDto: CreateUserInputDto): Promise<import("./interface/sign-up-user-response.interface").ISignUpUserResponse>;
    signin(signInUserDto: SignInUserInputDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: CustomRequest): Promise<void>;
    refreshTokens(req: CustomRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
