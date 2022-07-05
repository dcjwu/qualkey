import { AwsSesService } from "../aws/aws.ses.service";
import { PrismaService } from "../prisma/prisma.service";
import { SettingsService } from "../settings/settings.service";
import { OtpResponseDto } from "./dto";
export declare class OtpService {
    private prisma;
    private ses;
    private systemSettings;
    constructor(prisma: PrismaService, ses: AwsSesService, systemSettings: SettingsService);
    sendOtp(email: string, rateLimitForOtp: number): Promise<OtpResponseDto>;
    checkOtp(code: string, otpUuid: string): Promise<void>;
}
