import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

/**
 * Data Transfer Object of the Forgot Password Request
 */
export class ForgotPasswordRequestDto {
    @IsEmail()
    @IsNotEmpty()
      email: string;

    @IsNumberString()
    @IsNotEmpty()
    @Length(4, 4)
      otp: string;

    @IsString()
    @IsNotEmpty()
      otpUuid: string;

    @IsString()
    @IsNotEmpty()
      newPassword: string;
}
