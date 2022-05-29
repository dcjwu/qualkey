import { GoneException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";

import { AwsSesService } from "../aws/aws.ses.service";
import { UserNotFoundException } from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";
import { OtpResponseDto } from "./dto";

/**
 * Class which do all the work regarding One Time Passwords
 */
@Injectable()
export class OtpService {
  constructor(
        private prisma: PrismaService,
        private ses: AwsSesService,
  ) {}

  /**
     * Function sends the OTP to email for login
     */
  public async sendOtp(email: string, rateLimitForOtp: number): Promise<OtpResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (! user) throw new UserNotFoundException(email);

    const canBeResentAt = new Date();
    canBeResentAt.setSeconds(canBeResentAt.getSeconds() + rateLimitForOtp);

    const validUntil = new Date();
    validUntil.setSeconds(validUntil.getSeconds() + 60);

    const otp = await this.prisma.oneTimePassword.create({
      data: {
        code: Math.random().toFixed(4).substring(2, 6), // generate 4 digit password
        validUntil: validUntil,
        canBeResentAt: canBeResentAt,
      },
    });

    // TODO: enable it back
    await this.ses.sendOtpEmail(email, otp.code);

    return new OtpResponseDto(otp.uuid, otp.validUntil, otp.canBeResentAt);
  }

  /**
   * Check if One Time Password is correct
   */
  public async checkOtp(code: string, otpUuid: string): Promise<void> {
    const otp = await this.prisma.oneTimePassword.findUnique({ where: { uuid: otpUuid } });

    if (! otp) throw new NotFoundException("code not found");

    if (new Date() > otp.validUntil) throw new GoneException("code expired");

    if (otp.code !== code) throw new UnprocessableEntityException("incorrect code");

    await this.prisma.oneTimePassword.delete({ where: { uuid: otpUuid } });
  }
}