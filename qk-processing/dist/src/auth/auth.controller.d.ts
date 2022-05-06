import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: AuthDto): Promise<{
        uuid: string;
        email: string;
        createdAt: Date;
    }>;
    login(dto: AuthDto, response: Response): Promise<string>;
}
