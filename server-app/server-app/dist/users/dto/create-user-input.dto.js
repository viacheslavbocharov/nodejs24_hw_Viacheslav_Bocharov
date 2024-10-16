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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserInputDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserInputDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, age: { required: true, type: () => Number }, isStudent: { required: true, type: () => Boolean }, email: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.CreateUserInputDto = CreateUserInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', description: 'The first name of the user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', description: 'The last name of the user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, description: 'The age of the user', minimum: 0 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateUserInputDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is the user a student' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserInputDto.prototype, "isStudent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@example.com',
        description: 'The email of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password123',
        description: 'The password of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "password", void 0);
//# sourceMappingURL=create-user-input.dto.js.map