import { IUpdateUserPartialInput } from '../interfaces/update-user-partial-input.interface';
export declare class UpdateUserPartialInputDto implements IUpdateUserPartialInput {
    firstName?: string | null;
    lastName?: string | null;
    age?: number | null;
    isStudent?: boolean | null;
}
