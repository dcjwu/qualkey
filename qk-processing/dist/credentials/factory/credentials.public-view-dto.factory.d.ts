import { Credential, CredentialChange } from "@prisma/client";
import { InstitutionRepository } from "../../institution/repository/institution.repository";
import { UploadRepository } from "../../upload/repository/upload.repository";
import { UserRepository } from "../../user/user.repository";
import { CredentialsPublicViewDto } from "../dto";
export declare class CredentialsPublicViewDtoFactory {
    private readonly uploadRepository;
    private readonly userRepository;
    private readonly institutionRepository;
    constructor(uploadRepository: UploadRepository, userRepository: UserRepository, institutionRepository: InstitutionRepository);
    createFromCredentials(credentials: Credential, credentialChange: CredentialChange, allowed: string[]): Promise<CredentialsPublicViewDto>;
}
