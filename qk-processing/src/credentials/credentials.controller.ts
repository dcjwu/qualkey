import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { Credential, User } from "@prisma/client";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { CredentialsChangeRepository } from "./credentials-change.repository";
import { CredentialsRepository } from "./credentials.repository";
import { CredentialsService } from "./credentials.service";

/**
 * This is the API gateway for credentials, all requests regarding credentials come here
 */
@Controller("credential")
@UseGuards(JwtGuard)
export class CredentialsController {
  constructor(
      private credentialsService: CredentialsService,
      private credentialsRepository: CredentialsRepository,
      private credentialsChangeRepository: CredentialsChangeRepository,
  ) {}

  /**
   * Get credentials endpoint
   */
    @HttpCode(HttpStatus.OK)
    @Get()
  async getCredentials(@GetUser() user: User, @Query("uuid") uuid: string): Promise<Credential> {
    return await this.credentialsRepository.getByUuid(uuid);
  }

  /**
   * Get credentialChange endpoint
   */
  @HttpCode(HttpStatus.OK)
  @Get("change")
    async getCredentialChange(@GetUser() user: User, @Query("uuid") uuid: string): Promise<boolean> {
    // TODO: implement
      return await this.credentialsChangeRepository.hasHash(uuid);
    }
}
