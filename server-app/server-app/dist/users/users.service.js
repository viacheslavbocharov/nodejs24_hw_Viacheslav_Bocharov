"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let users = [];
let UsersService = class UsersService {
    findOneAndUpdate(id, updateBody) {
        const user = this.findOneById(id);
        return this.updatePartially(user.id, updateBody);
    }
    create(dto) {
        const newUser = { id: users.length + 1, ...dto };
        users.push(newUser);
        return newUser;
    }
    findOneByEmail(email) {
        const user = users.find((user) => user.email === email);
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    list() {
        return users;
    }
    findOneWithoutExeption(email) {
        return users.find((user) => user.email === email);
    }
    findOneById(id) {
        const user = users.find((user) => user.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    updatePartially(id, dto) {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (dto.hasOwnProperty('id')) {
            throw new common_1.UnprocessableEntityException('Updating the "id" field is not allowed');
        }
        const updatedUser = { ...users[userIndex], ...dto };
        users[userIndex] = updatedUser;
        return updatedUser;
    }
    update(id, dto) {
        const userIndex = users.findIndex((user) => user.id === id);
        const user = users[userIndex];
        if (userIndex === -1) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (dto.hasOwnProperty('id')) {
            throw new common_1.UnprocessableEntityException('Updating the "id" field is not allowed');
        }
        const updatedUser = { ...user, ...dto };
        users[userIndex] = updatedUser;
        return users[userIndex];
    }
    remove(id) {
        const user = users.find((user) => user.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        users = users.filter((user) => user.id !== id);
        return `User with ID ${id} removed successfully`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map