import { Job } from "bull";
import { AwsSesService } from "../../aws/aws.ses.service";
export declare class UploadNotifyConsumer {
    private ses;
    constructor(ses: AwsSesService);
    handlePending(job: Job): Promise<void>;
    handleApproved(job: Job): Promise<void>;
    handleRejected(job: Job): Promise<void>;
    onActive(job: Job): void;
}
