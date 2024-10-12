import { ConfigService } from '@nestjs/config';
type JwtPayload = {
    sub: number;
    email: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => any;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
