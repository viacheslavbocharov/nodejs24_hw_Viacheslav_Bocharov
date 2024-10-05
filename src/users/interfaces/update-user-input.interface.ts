import { IUser } from './user.interface';

//Omit<IUser, 'id'> создает новый тип, который содержит все поля интерфейса IUser, кроме поля id.
//Partial преобразует все поля типа T в необязательные.
export type IUpdateUserInput = Partial<Omit<IUser, 'id'>>;
