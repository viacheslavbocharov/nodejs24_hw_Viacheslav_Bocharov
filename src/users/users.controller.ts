import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-input.dto';
import { UpdateUserDto } from './dto/update-user-input.dto';
import { UpdateUserPartialDto } from './dto/update-user-partial-input.dto';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): IUser {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): IUser[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  updatePartially(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserPartialDto,
  ): IUser {
    return this.usersService.updatePartially(id, updateUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): IUser {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
