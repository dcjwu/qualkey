import { Job } from "bull";
import { AwsSesService } from "../../aws/aws.ses.service";
import { UserRepository } from "../../user/user.repository";
export declare class CredentialsNotifyConsumer {
    private readonly ses;
    private readonly userRepository;
    constructor(ses: AwsSesService, userRepository: UserRepository);
    handleWithdrawalApproved(job: Job): Promise<void>;
    handleWithdrawalRejected(job: Job): Promise<void>;
    handleWithdrawalRequestCreated(job: Job): Promise<void>;
    handleCredentialsShare(job: Job): Promise<void>;
    handleCredentialsActivated(job: Job): Promise<void>;
    handleCredentialsChangeRequested(job: Job): Promise<void>;
    handleCredentialsChangeRejected(job: Job): Promise<void>;
    handleCredentialsChangedRepresentative(job: Job): Promise<void>;
    handleCredentialsChangedStudent(job: Job): Promise<void>;
    handleCredentialsWithdrawnStudent(job: Job): Promise<void>;
    handleCredentialsUploaded(job: Job): Promise<void>;
    handleCredentialsManipulated(job: Job): Promise<void>;
}
