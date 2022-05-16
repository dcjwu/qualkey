import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { User } from "@prisma/client";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { GetUser } from "./decorator";
import {
  AuthCheckCredentialsRequestDto,
  AuthRequestDto,
  OtpRequestDto,
  OtpResponseDto,
  ResetPasswordRequestDto,
} from "./dto";
import { JwtGuard } from "./guard";
import { OtpService } from "./otp.service";

const rateLimitForOtp = 15;
/**
 * This is the API gateway for authentication, all authentication requests come here
 */
@Controller("auth")
export class AuthController {
  constructor(
      private authService: AuthService,
      private otpService: OtpService,
  ) {}

  /**
   * Send OneTimePassword endpoint
   */
  @Throttle(1, rateLimitForOtp)
  @Post("otp")
  otp(@Body() dto: OtpRequestDto): Promise<OtpResponseDto> {
    return this.otpService.sendOtp(dto.email, rateLimitForOtp);
  }

  /**
   * Register endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Post("register")
  register(@Body() dto: AuthRequestDto): Promise<{ uuid: string, email: string, createdAt: Date }> {
    return this.authService.register(dto);
  }

  /**
   * Login endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() dto: AuthRequestDto, @Res({ passthrough: true }) response: Response ): Promise<string> {
    await this.otpService.checkOtp(dto.otp, dto.otpUuid);
    return this.authService.login(dto, response);
  }

  /**
   * Check credentials endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Post("check")
  async checkCredentials(@Body() dto: AuthCheckCredentialsRequestDto): Promise<void> {
    await this.authService.checkCredentials(dto);
  }

  /**
   * Reset password endpoint
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post("password-reset")
  async resetPassword(@GetUser() user: User, @Body() dto: ResetPasswordRequestDto): Promise<void> {
    await this.authService.resetPassword(dto, user.email);
  }
}