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
  // UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserInputDto } from './dto/update-user-input.dto';
import { UpdateUserPartialInputDto } from './dto/update-user-partial-input.dto';
import { IUser } from './interfaces/user.interface';
// import { AccessTokenGuard } from '../guards/access-token.guard';

@ApiTags('users')
@ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user was successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUser(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.findOneById(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned successfully.',
  })
  listUsers(): IUser[] {
    return this.usersService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserInputDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  create(@Body() createUserInputDto: CreateUserInputDto): IUser {
    return this.usersService.create(createUserInputDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a user' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiBody({ type: UpdateUserPartialInputDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been partially updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  updateUserPartially(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserPartialInputDto,
  ): IUser {
    return this.usersService.updatePartially(id, updateUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiBody({ type: UpdateUserInputDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserInputDto,
  ): IUser {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
