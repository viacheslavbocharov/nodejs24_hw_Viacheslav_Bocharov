import { ICreateUserInput } from '../interfaces/create-user-input.interface';
export declare class CreateUserInputDto implements ICreateUserInput {
    firstName: string;
    lastName: string;
    age: number;
    isStudent: boolean;
    email: string;
    password: string;
}
