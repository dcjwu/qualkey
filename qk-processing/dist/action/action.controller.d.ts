import { User, UserActions } from "@prisma/client";
import { ActionRepository } from "./action.repository";
import { ActionService } from "./action.service";
import { ActionDecisionDto } from "./dto/action.decision.dto";
export declare class ActionController {
    private actionService;
    private actionRepository;
    constructor(actionService: ActionService, actionRepository: ActionRepository);
    getUserActions(user: User): Promise<UserActions[]>;
    postDecisionOnUserAction(user: User, dto: ActionDecisionDto): Promise<void>;
}
