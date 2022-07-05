import { Credential, User } from "@prisma/client";
import { CredentialWithEverythingType } from "../../common/types/credentials/credential-with-everything.type";
import { CredentialsWithCredentialChange } from "../../common/types/credentials/credentials-with-credential-change.type";
import { PrismaService } from "../../prisma/prisma.service";
export declare class CredentialsRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    getByUuid(uuid: string): Promise<Credential>;
    getByUuidWithChanges(uuid: string): Promise<CredentialWithEverythingType>;
    getByDid(did: string): Promise<Credential>;
    getByDidWithLastChange(did: string): Promise<Credential>;
    getAllForStudent(user: User, filter?: string): Promise<Credential[]>;
    getAllForInstitution(user: User, offset: number, limit: number, filter?: string): Promise<Credential[]>;
    getAllNewCredentials(): Promise<CredentialsWithCredentialChange>;
}
