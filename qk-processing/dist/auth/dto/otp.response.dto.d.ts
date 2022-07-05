export declare class OtpResponseDto {
    private otpUuid;
    private validUntil;
    private canBeResentAt;
    constructor(otpUuid: string, validUntil: Date, canBeResentAt: Date);
}
