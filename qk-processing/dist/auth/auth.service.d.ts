import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { AuthCheckCredentialsRequestDto, AuthOtpRequestDto, AuthRequestDto, ForgotPasswordRequestDto, ResetPasswordRequestDto } from "./dto";
import { RouteProvider } from "./provider";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private routeProvider;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, routeProvider: RouteProvider);
    register(dto: AuthRequestDto): Promise<{
        uuid: string;
        email: string;
        createdAt: Date;
    }>;
    login(dto: AuthRequestDto, response: Response): Promise<string>;
    loginOtp(dto: AuthOtpRequestDto, response: Response): Promise<string>;
    checkCredentials(dto: AuthCheckCredentialsRequestDto): Promise<void>;
    logout(response: Response): Promise<string>;
    checkJwt(request: Request): Promise<string>;
    resetPassword(dto: ResetPasswordRequestDto, email: string, response: Response): Promise<void>;
    forgotPassword(dto: ForgotPasswordRequestDto): Promise<void>;
    private signToken;
    private static hashData;
}
