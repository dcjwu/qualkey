import { CredentialsChangeRepository } from "../credentials/repository/credentials-change.repository";
import { HederaCredentialInfoDto } from "./dto/hedera.credential-info.dto";
import { HederaService } from "./hedera.service";
export declare class HederaController {
    private hederaService;
    private credentialsChangeRepository;
    constructor(hederaService: HederaService, credentialsChangeRepository: CredentialsChangeRepository);
    getCredentialsFromSmartContract(did: string): Promise<HederaCredentialInfoDto>;
}
