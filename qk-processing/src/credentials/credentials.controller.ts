import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from "@nestjs/common";
import { Credential, CredentialsWithdrawalRequest, Role, User } from "@prisma/client";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { CredentialsService } from "./credentials.service";
import { CredentialsWithdrawalRequestDto } from "./dto";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
import { CredentialsRepository } from "./repository/credentials.repository";

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
    @Get()
  async getCredentials(
      @GetUser() user: User,
      @Query("uuid") uuid: string,
      @Query("filter") filter: string,
  ): Promise<Credential[]> {
    if (uuid && uuid !== "") {
      const credentials = await this.credentialsRepository.getByUuid(uuid);

      if (user.role === Role.STUDENT && user.uuid !== credentials.studentUuid) {
        throw new ForbiddenException();
      }
      if (user.role === Role.INSTITUTION_REPRESENTATIVE && user.institutionUuid !== credentials.institutionUuid) {
        throw new ForbiddenException();
      }

      return [credentials];
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
   * Post credentials withdrawal request
   */
  @HttpCode(HttpStatus.OK)
  @Post("withdraw")
    async postCredentialsWithdrawalRequest(
      @GetUser() user: User,
      @Body() dto: CredentialsWithdrawalRequestDto,
    ): Promise<CredentialsWithdrawalRequest> {
      if (user.role !== Role.INSTITUTION_REPRESENTATIVE) throw new ForbiddenException();
      return await this.credentialsService.createCredentialsWithdrawalRequest(dto.uuid, user);
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
