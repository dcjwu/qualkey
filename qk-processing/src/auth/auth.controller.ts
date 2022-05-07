import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

/**
 * This is the API gateway for authentication, all authentication requests come here
 */
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Post("register")
  register(@Body() dto: AuthDto): Promise<{ uuid: string, email: string, createdAt: Date }> {
    return this.authService.register(dto);
  }

  /**
   * Login endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response ): Promise<string> {
    return this.authService.login(dto, response);
  }
}