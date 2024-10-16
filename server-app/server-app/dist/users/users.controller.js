"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_input_dto_1 = require("./dto/create-user-input.dto");
const update_user_input_dto_1 = require("./dto/update-user-input.dto");
const update_user_partial_input_dto_1 = require("./dto/update-user-partial-input.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUser(id) {
        return this.usersService.findOneById(id);
    }
    listUsers() {
        return this.usersService.list();
    }
    create(createUserInputDto) {
        return this.usersService.create(createUserInputDto);
    }
    updateUserPartially(id, updateUserDto) {
        return this.usersService.updatePartially(id, updateUserDto);
    }
    updateUser(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    deleteUser(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user was successfully retrieved.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all users' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of users returned successfully.',
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], UsersController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiBody)({ type: create_user_input_dto_1.CreateUserInputDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The user has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input data.',
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_dto_1.CreateUserInputDto]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially update a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID of the user' }),
    (0, swagger_1.ApiBody)({ type: update_user_partial_input_dto_1.UpdateUserPartialInputDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user has been partially updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_partial_input_dto_1.UpdateUserPartialInputDto]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "updateUserPartially", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID of the user' }),
    (0, swagger_1.ApiBody)({ type: update_user_input_dto_1.UpdateUserInputDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_input_dto_1.UpdateUserInputDto]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map