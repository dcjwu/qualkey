import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    has(email: string): Promise<boolean>;
    get(email: string): Promise<User>;
    getByUuid(uuid: string): Promise<User>;
    getActiveAdmins(): Promise<User[]>;
}
