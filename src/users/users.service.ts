import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { ICreateUserInput } from './interfaces/create-user-input.interface';
import { IUpdateUserInput } from './interfaces/update-user-input.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';

let users = [];

@Injectable()
export class UsersService {
  create(createUserDto: ICreateUserInput): IUser {
    const newUser = { id: users.length + 1, ...createUserDto };
    users.push(newUser);
    return newUser;
  }

  findAll(): IUser[] {
    return users;
  }

  findOne(id: number): IUser {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  updatePartially(id: number, dto: IUpdateUserPartialInput): IUser {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (dto.hasOwnProperty('id')) {
      throw new UnprocessableEntityException(
        'Updating the "id" field is not allowed',
      );
    }

    const updatedUser = { ...users[userIndex], ...dto };
    users[userIndex] = updatedUser;

    return updatedUser;
  }

  update(id: number, dto: IUpdateUserInput): IUser {
    const userIndex = users.findIndex((user) => user.id === id);
    const user = users[userIndex];

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (dto.hasOwnProperty('id')) {
      throw new UnprocessableEntityException(
        'Updating the "id" field is not allowed',
      );
    }

    const updatedUser = { ...user, ...dto };

    users[userIndex] = updatedUser;

    return users[userIndex] as IUser;
  }

  remove(id: number) {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    users = users.filter((user) => user.id !== id);

    return `User with ID ${id} removed successfully`;
  }
}
