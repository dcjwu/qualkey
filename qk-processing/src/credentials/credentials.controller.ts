import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { CredentialsService } from "./credentials.service";

/**
 * This is the API gateway for credentials, all requests regarding credentials come here
 */
@Controller("credential")
@UseGuards(JwtGuard)
export class CredentialsController {
  constructor(private credentialsService: CredentialsService) {}

  /**
   * Get credentials endpoint
   */
    @HttpCode(HttpStatus.OK)
    @Get()
  getCredentials(@GetUser() user: User):string {
    return this.credentialsService.getCredentials(user);
  }
}
