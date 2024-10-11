import { IUser } from './interfaces/user.interface';
import { ICreateUserInput } from './interfaces/create-user-input.interface';
import { IUpdateUserInput } from './interfaces/update-user-input.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';
export declare class UsersService {
    findOneAndUpdate(id: number, updateBody: IUpdateUserPartialInput): IUser;
    create(dto: ICreateUserInput): IUser;
    findOneByEmail(email: string): IUser;
    list(): IUser[];
    findOneWithoutExeption(email: string): IUser;
    findOneById(id: number): IUser;
    updatePartially(id: number, dto: IUpdateUserPartialInput): IUser;
    update(id: number, dto: IUpdateUserInput): IUser;
    remove(id: number): string;
}
