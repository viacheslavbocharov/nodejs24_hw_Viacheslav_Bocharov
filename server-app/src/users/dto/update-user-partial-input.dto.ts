import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { IUpdateUserPartialInput } from '../interfaces/update-user-partial-input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPartialInputDto implements IUpdateUserPartialInput {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  firstName?: string | null;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  lastName?: string | null;

  @ApiProperty({
    example: 25,
    description: 'The age of the user',
    required: false,
    nullable: true,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  age?: number | null;

  @ApiProperty({
    example: true,
    description: 'Is the user a student',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isStudent?: boolean | null;
}
