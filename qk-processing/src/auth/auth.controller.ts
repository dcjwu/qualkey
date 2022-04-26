import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

    @HttpCode(HttpStatus.OK)
    @Post("register")
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response ) {
      return this.authService.login(dto, response);
    }
}