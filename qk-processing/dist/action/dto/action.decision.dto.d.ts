import { UserActionType } from "@prisma/client";
import { Decision } from "../enum/decision.enum";
export declare class ActionDecisionDto {
    actionId: string;
    subjectUuid: string;
    type: UserActionType;
    decision: Decision;
}
