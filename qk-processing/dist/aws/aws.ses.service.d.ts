export declare class AwsSesService {
    private config;
    private settings;
    private NO_REPLY_EMAIL;
    sendWelcomeUserEmail(recipientEmail: string, name: string, password: string): Promise<void>;
    sendReviewUploadEmail(recipientEmail: string): Promise<void>;
    sendReviewWithdrawalEmail(recipientEmail: string): Promise<void>;
    sendWithdrawalApprovedEmail(recipientEmail: string): Promise<void>;
    sendWithdrawalRejectedEmail(recipientEmail: string): Promise<void>;
    sendOtpEmail(recipientEmail: string, otp: string): Promise<void>;
    sendUploadApproved(recipientEmail: string): Promise<void>;
    sendShareCredentials(recipientEmail: string, temporaryPassword: string): Promise<void>;
    sendCredentialsChangeRequested(recipientEmail: string): Promise<void>;
    sendCredentialsChangedStudent(recipientEmail: string): Promise<void>;
    sendCredentialsWithdrawnStudent(recipientEmail: string): Promise<void>;
    sendCredentialsUploaded(recipientEmail: string): Promise<void>;
    sendCredentialsManipulated(recipientEmail: string): Promise<void>;
    sendCredentialsChangedRepresentative(recipientEmail: string): Promise<void>;
    sendCredentialsChangeRejected(recipientEmail: string): Promise<void>;
    sendCredentialsActivated(recipientEmail: string): Promise<void>;
    sendPaymentFailed(recipientEmail: string): Promise<void>;
    sendPaymentCompleted(recipientEmail: string): Promise<void>;
    sendUploadRejected(recipientEmail: string): Promise<void>;
    private sendEmailTemplate;
    private getSES;
    createTemplate(): Promise<void>;
}
