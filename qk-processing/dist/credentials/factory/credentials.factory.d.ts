import { Credential, User } from "@prisma/client";
import { HederaService } from "../../hedera/hedera.service";
import { PrismaService } from "../../prisma/prisma.service";
import { CredentialsDataDto } from "../dto";
export declare class CredentialsFactory {
    private prisma;
    private hedera;
    constructor(prisma: PrismaService, hedera: HederaService);
    create(dto: CredentialsDataDto, student: User, uploadUuid: string): Promise<Credential>;
}
