import { CredentialsShareService } from "./credentials-share.service";
import { CredentialsService } from "./credentials.service";
import { CredentialsPublicViewDto } from "./dto";
import { CredentialsPublicViewDtoFactory } from "./factory/credentials.public-view-dto.factory";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
import { CredentialsShareRepository } from "./repository/credentials-share.repository";
import { CredentialsRepository } from "./repository/credentials.repository";
export declare class CredentialsPublicController {
    private credentialsService;
    private credentialsRepository;
    private credentialsShareService;
    private credentialsShareRepository;
    private credentialsChangeRepository;
    private credentialsPublicViewDtoFactory;
    constructor(credentialsService: CredentialsService, credentialsRepository: CredentialsRepository, credentialsShareService: CredentialsShareService, credentialsShareRepository: CredentialsShareRepository, credentialsChangeRepository: CredentialsChangeRepository, credentialsPublicViewDtoFactory: CredentialsPublicViewDtoFactory);
    getCredentialsViewData(did: string): Promise<CredentialsPublicViewDto>;
    getCredentialsSharedList(uuid: string, password: string): Promise<CredentialsPublicViewDto[]>;
}
