import { Job } from "bull";
import { AwsSesService } from "../../aws/aws.ses.service";
export declare class PaymentNotifyConsumer {
    private ses;
    constructor(ses: AwsSesService);
    handleFailed(job: Job): Promise<void>;
    handleCompleted(job: Job): Promise<void>;
}
