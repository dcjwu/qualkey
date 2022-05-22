import { Controller, ForbiddenException, Get, HttpCode, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { Credential, Role, User } from "@prisma/client";

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
  async getCredentials(
      @GetUser() user: User,
      @Query("uuid") uuid: string,
      @Query("filter") filter: string,
  ): Promise<Credential[]> {
    if (uuid && uuid !== "") {
      return [await this.credentialsRepository.getByUuid(uuid, user)];
    }
    if (user.role === Role.STUDENT) {
      return this.credentialsRepository.getAllForStudent(user, filter);
    }
    if (user.role === Role.INSTITUTION_REPRESENTATIVE) {
      return this.credentialsRepository.getAllForInstitution(user, filter);
    }

    throw new ForbiddenException();
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
