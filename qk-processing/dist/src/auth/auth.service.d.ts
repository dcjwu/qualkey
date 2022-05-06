import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { RouteProvider } from "./provider";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private routeProvider;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, routeProvider: RouteProvider);
    register(dto: AuthDto): Promise<{
        uuid: string;
        email: string;
        createdAt: Date;
    }>;
    login(dto: AuthDto, response: Response): Promise<string>;
    signToken(userId: string, email: string, role: Role, rememberMe: boolean): Promise<string>;
    hashData(data: string): string;
}
