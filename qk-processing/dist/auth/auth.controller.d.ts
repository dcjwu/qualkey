import { User } from "@prisma/client";
import { Request, Response } from "express";
import { SettingsService } from "../settings/settings.service";
import { AuthService } from "./auth.service";
import { AuthCheckCredentialsRequestDto, AuthOtpRequestDto, AuthRequestDto, ForgotPasswordRequestDto, OtpRequestDto, OtpResponseDto, ResetPasswordRequestDto } from "./dto";
import { OtpService } from "./otp.service";
export declare class AuthController {
    private authService;
    private otpService;
    private systemSettings;
    constructor(authService: AuthService, otpService: OtpService, systemSettings: SettingsService);
    otp(dto: OtpRequestDto): Promise<OtpResponseDto>;
    register(dto: AuthRequestDto): Promise<{
        uuid: string;
        email: string;
        createdAt: Date;
    }>;
    authWithOtp(dto: AuthOtpRequestDto, response: Response): Promise<string>;
    login(dto: AuthRequestDto, response: Response): Promise<string>;
    checkCredentials(dto: AuthCheckCredentialsRequestDto): Promise<void>;
    logout(response: Response): Promise<string>;
    checkJwt(request: Request): Promise<string>;
    resetPassword(user: User, dto: ResetPasswordRequestDto, response: Response): Promise<void>;
    forgotPassword(user: User, dto: ForgotPasswordRequestDto): Promise<void>;
}
