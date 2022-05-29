import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from "@nestjs/common";
import { Credential, CredentialShare, CredentialsWithdrawalRequest, Role, User } from "@prisma/client";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { CredentialsShareService } from "./credentials-share.service";
import { CredentialsService } from "./credentials.service";
import {CredentialsWithdrawalRequestDto, CredentialsShareRequestDto, CredentialViewDataDto} from "./dto";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
import { CredentialsShareRepository } from "./repository/credentials-share.repository";
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
      private credentialsShareService: CredentialsShareService,
      private credentialsShareRepository: CredentialsShareRepository,
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
   * Post credentials share request
   */
  @HttpCode(HttpStatus.OK)
  @Post("share")
  async postCredentialsShare(
      @GetUser() user: User,
      @Body() dto: CredentialsShareRequestDto,
  ): Promise<CredentialShare> {
    const credentials = await this.credentialsRepository.getByUuid(dto.uuid);

    if (user.uuid !== credentials.studentUuid) {
      throw new ForbiddenException();
    }

    return await this.credentialsShareService.processCredentialsShare(dto);
  }

  /**
   * Get credentials shares request
   */
  @HttpCode(HttpStatus.OK)
  @Get("share")
  async getCredentialsShares(
      @GetUser() user: User,
      @Query("credentialsUuid") credentialsUuid: string,
  ): Promise<CredentialShare[]> {
    if (credentialsUuid && credentialsUuid !== "") {
      const credentials = await this.credentialsRepository.getByUuid(credentialsUuid);

      if (user.uuid !== credentials.studentUuid) {
        throw new ForbiddenException();
      }

      return await this.credentialsShareRepository.findByCredentialsUuid(credentialsUuid);
    }
  }

  /**
   * Get credentials view data for access when shared
   */
  @HttpCode(HttpStatus.OK)
  @Get(":did/view")
  async getCredentialsViewData(
      @GetUser() user: User,
      @Query("did") did: string,
      @Query("password") password: string,
  ): Promise<CredentialViewDataDto> {
    if (! password || password)
    if (did && did !== "") {
      const credentials = await this.credentialsRepository.getByDid(did);

      if (user.uuid !== credentials.studentUuid) {
        throw new ForbiddenException();
      }
    }

    return new CredentialViewDataDto();
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
