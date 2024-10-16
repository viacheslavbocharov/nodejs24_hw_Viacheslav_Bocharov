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
exports.UpdateUserPartialInputDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateUserPartialInputDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: false, type: () => String, nullable: true }, lastName: { required: false, type: () => String, nullable: true }, age: { required: false, type: () => Number, nullable: true }, isStudent: { required: false, type: () => Boolean, nullable: true } };
    }
}
exports.UpdateUserPartialInputDto = UpdateUserPartialInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John',
        description: 'The first name of the user',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserPartialInputDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Doe',
        description: 'The last name of the user',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserPartialInputDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25,
        description: 'The age of the user',
        required: false,
        nullable: true,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateUserPartialInputDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Is the user a student',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserPartialInputDto.prototype, "isStudent", void 0);
//# sourceMappingURL=update-user-partial-input.dto.js.map