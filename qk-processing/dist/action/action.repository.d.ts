import { User, UserActions } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class ActionRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getById(id: number): Promise<UserActions>;
    getUserActions(user: User): Promise<UserActions[]>;
}
