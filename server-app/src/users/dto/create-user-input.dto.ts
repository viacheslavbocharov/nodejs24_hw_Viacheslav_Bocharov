import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ICreateUserInput } from '../interfaces/create-user-input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInputDto implements ICreateUserInput {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 25, description: 'The age of the user', minimum: 0 })
  @IsInt()
  age: number;

  @ApiProperty({ example: true, description: 'Is the user a student' })
  @IsBoolean()
  isStudent: boolean;

  @ApiProperty({
    example: 'john.doe@example.com',
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
