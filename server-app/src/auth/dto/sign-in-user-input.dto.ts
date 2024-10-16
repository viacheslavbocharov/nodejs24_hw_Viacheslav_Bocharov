import { ApiProperty } from '@nestjs/swagger';
import { ISignInUserInput } from '../interface/sign-in-user.interface';
import { IsString } from 'class-validator';

export class SignInUserInputDto implements ISignInUserInput {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  password: string;
}
