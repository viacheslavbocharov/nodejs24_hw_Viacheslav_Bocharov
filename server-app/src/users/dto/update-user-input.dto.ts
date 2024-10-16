import { IsBoolean, IsInt, IsString } from 'class-validator';
import { IUpdateUserInput } from '../interfaces/update-user-input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInputDto implements IUpdateUserInput {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    required: false,
    nullable: true,
  })
  @IsString()
  firstName: string | null;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    required: false,
    nullable: true,
  })
  @IsString()
  lastName: string | null;

  @ApiProperty({
    example: 25,
    description: 'The age of the user',
    required: false,
    nullable: true,
    minimum: 0,
  })
  @IsInt()
  age: number | null;

  @ApiProperty({
    example: true,
    description: 'Is the user a student',
    required: false,
    nullable: true,
  })
  @IsBoolean()
  isStudent: boolean | null;
}
