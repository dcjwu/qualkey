import { User } from "@prisma/client";
import { CredentialsService } from "./credentials.service";
export declare class CredentialsController {
    private credentialsService;
    constructor(credentialsService: CredentialsService);
    getCredentials(user: User): string;
}
