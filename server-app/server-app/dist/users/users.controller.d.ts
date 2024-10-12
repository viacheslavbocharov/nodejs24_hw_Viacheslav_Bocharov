import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { UpdateUserPartialInputDto } from './dto/update-user-partial-input.dto';
import { IUser } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(id: number): IUser;
    listUsers(): IUser[];
    create(createUserInputDto: CreateUserInputDto): IUser;
    updateUserPartially(id: number, updateUserDto: UpdateUserPartialInputDto): IUser;
    updateUser(id: number, updateUserDto: UpdateUserInputDto): IUser;
    deleteUser(id: number): string;
}
