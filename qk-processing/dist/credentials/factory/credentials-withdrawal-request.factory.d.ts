import { CredentialsWithdrawalRequest, User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class CredentialsWithdrawalRequestFactory {
    private prisma;
    constructor(prisma: PrismaService);
    create(credentialsUuid: string, initiatedBy: User, representatives: User[]): Promise<CredentialsWithdrawalRequest>;
}
