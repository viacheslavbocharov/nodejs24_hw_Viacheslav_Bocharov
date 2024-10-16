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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, configService, usersService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signUp(body) {
        const { firstName, lastName, age, isStudent, email, password } = body;
        this.logger.log(`Going to sign up new user with email: ${email}`);
        const user = this.usersService.findOneWithoutExeption(email);
        if (user) {
            throw new common_1.BadRequestException(`User with email: ${email} already exists`);
        }
        const hash = await this.hashData(password);
        const newUser = this.usersService.create({
            firstName,
            lastName,
            age,
            isStudent,
            email,
            password: hash,
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        this.logger.log(`User with email: ${newUser.email} successfully signed up`);
        return tokens;
    }
    async signIn(body) {
        const { email, password } = body;
        const user = this.usersService.findOneByEmail(email);
        if (!user)
            throw new common_1.BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.id, email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        return this.usersService.findOneAndUpdate(userId, { refreshToken: null });
    }
    hashData(data) {
        return argon2.hash(data);
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.findOneAndUpdate(userId, {
            refreshToken: hashedRefreshToken,
        });
    }
    async getTokens(userId, email) {
        this.logger.log(`Going to generate tokens for user with email: ${email}`);
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_SECRET_EXPIRE'),
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_SECRET_EXPIRE'),
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(userId, refreshToken) {
        this.logger.log(`Going to generate tokens for user with id: ${userId}`);
        const user = this.usersService.findOneById(userId);
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.firstName);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map