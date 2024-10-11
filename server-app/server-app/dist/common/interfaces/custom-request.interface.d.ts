import { Request } from 'express';
export interface CustomRequest extends Request {
    user: {
        sub: number;
        refreshToken?: string;
    };
}
