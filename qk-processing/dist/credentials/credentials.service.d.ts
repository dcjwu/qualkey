import { User } from "@prisma/client";
import { CredentialsRepository } from "./credentials.repository";
export declare class CredentialsService {
    private credentialsRepository;
    constructor(credentialsRepository: CredentialsRepository);
    getCredentials(user: User): string;
}
