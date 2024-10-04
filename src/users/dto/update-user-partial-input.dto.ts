import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { IUpdateUserPartialInput } from '../interfaces/update-user-partial-input.interface';

export class UpdateUserPartialDto implements IUpdateUserPartialInput {
  @IsOptional()
  @IsString()
  firstName?: string | null;

  @IsOptional()
  @IsString()
  lastName?: string | null;

  @IsOptional()
  @IsInt()
  age?: number | null;

  @IsOptional()
  @IsBoolean()
  isStudent?: boolean | null;
}
