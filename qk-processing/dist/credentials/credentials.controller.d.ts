import { Credential, CredentialChangeRequest, CredentialChange, CredentialShare, CredentialsWithdrawalRequest, User } from "@prisma/client";
import { CredentialsChangeService } from "./credentials-change.service";
import { CredentialsShareService } from "./credentials-share.service";
import { CredentialsChangeRequestService } from "./credentials.change-request.service";
import { CredentialsService } from "./credentials.service";
import { CredentialsWithdrawalRequestDto, CredentialsShareRequestDto, CredentialsGetRequestDto, CredentialsChangeGetRequestDto, CredentialsGetSharesRequestDto } from "./dto";
import { CredentialsRequestChangeDto } from "./dto/credentials.request-change.dto";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
import { CredentialsShareRepository } from "./repository/credentials-share.repository";
import { CredentialsRepository } from "./repository/credentials.repository";
export declare class CredentialsController {
    private credentialsService;
    private credentialsRepository;
    private credentialsShareService;
    private credentialsShareRepository;
    private credentialsChangeService;
    private credentialsChangeRepository;
    private credentialsChangeRequestService;
    constructor(credentialsService: CredentialsService, credentialsRepository: CredentialsRepository, credentialsShareService: CredentialsShareService, credentialsShareRepository: CredentialsShareRepository, credentialsChangeService: CredentialsChangeService, credentialsChangeRepository: CredentialsChangeRepository, credentialsChangeRequestService: CredentialsChangeRequestService);
    getCredentials(user: User, dto: CredentialsGetRequestDto): Promise<Credential[]>;
    postCredentialsWithdrawalRequest(user: User, dto: CredentialsWithdrawalRequestDto): Promise<CredentialsWithdrawalRequest>;
    postCredentialsShare(user: User, dto: CredentialsShareRequestDto): Promise<CredentialShare>;
    getCredentialsShares(user: User, dto: CredentialsGetSharesRequestDto): Promise<CredentialShare[]>;
    getCredentialsViewData(user: User, did: string): Promise<Credential>;
    getCredentialChange(user: User, dto: CredentialsChangeGetRequestDto): Promise<CredentialChange>;
    postCredentialChange(user: User, dto: CredentialsRequestChangeDto): Promise<CredentialChange>;
    postCredentialChangeRequest(user: User, dto: CredentialsRequestChangeDto): Promise<CredentialChangeRequest>;
    deleteCredentials(user: User, uuid: string): Promise<void>;
}
