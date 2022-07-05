import { ConfigService } from "@nestjs/config";
import { Role, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthService } from "../auth.service";
declare type JwtPayload = {
    sub: string;
    email: string;
    role: Role;
};
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    private authService;
    constructor(config: ConfigService, prisma: PrismaService, authService: AuthService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
