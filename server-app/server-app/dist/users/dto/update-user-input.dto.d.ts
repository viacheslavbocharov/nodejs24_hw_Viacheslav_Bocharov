import { IUpdateUserInput } from '../interfaces/update-user-input.interface';
export declare class UpdateUserInputDto implements IUpdateUserInput {
    firstName: string | null;
    lastName: string | null;
    age: number | null;
    isStudent: boolean | null;
}
