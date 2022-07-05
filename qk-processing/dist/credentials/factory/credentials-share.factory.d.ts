import { Credential, CredentialShare } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CredentialsShareRequestDto } from "../dto";
export declare class CredentialsShareFactory {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CredentialsShareRequestDto, credentialsList: Credential[]): Promise<CredentialShare>;
}
