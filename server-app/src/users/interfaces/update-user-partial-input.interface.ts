import { IUpdateUserInput } from './update-user-input.interface';
//Partial преобразует все поля типа T в необязательные.
export type IUpdateUserPartialInput = Partial<IUpdateUserInput>;
