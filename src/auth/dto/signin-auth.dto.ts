import { IsString, IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
