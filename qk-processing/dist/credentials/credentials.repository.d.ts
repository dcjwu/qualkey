import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class CredentialsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStudentCredentials(user: User): string;
    getInstitutionCredentials(user: User): string;
}
