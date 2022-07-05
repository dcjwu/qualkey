import { User } from "@prisma/client";
import { CredentialsChangeRequestService } from "../credentials/credentials.change-request.service";
import { CredentialsService } from "../credentials/credentials.service";
import { UploadService } from "../upload/upload.service";
import { ActionRepository } from "./action.repository";
import { ActionDecisionDto } from "./dto/action.decision.dto";
export declare class ActionService {
    private actionRepository;
    private uploadService;
    private credentialsService;
    private credentialsChangeRequestService;
    constructor(actionRepository: ActionRepository, uploadService: UploadService, credentialsService: CredentialsService, credentialsChangeRequestService: CredentialsChangeRequestService);
    processDecision(user: User, dto: ActionDecisionDto): Promise<void>;
}
