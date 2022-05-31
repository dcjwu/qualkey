import {
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from "@nestjs/common";

import { CredentialsShareExpiredException } from "../common/exception";
import { CredentialsShareService } from "./credentials-share.service";
import { CredentialsService } from "./credentials.service";
import { CredentialsChangeRepository } from "./repository/credentials-change.repository";
import { CredentialsShareRepository } from "./repository/credentials-share.repository";
import { CredentialsRepository } from "./repository/credentials.repository";
import { CredentialsPublicViewDto } from "./dto";

/**
 * This is the API gateway for public endpoints regarding credentials
 */
@Controller("credential")
export class CredentialsPublicController {
  constructor(
      private credentialsService: CredentialsService,
      private credentialsRepository: CredentialsRepository,
      private credentialsShareService: CredentialsShareService,
      private credentialsShareRepository: CredentialsShareRepository,
      private credentialsChangeRepository: CredentialsChangeRepository,
  ) {}

  /**
   * Get credentials view data for access when shared
   */
  @HttpCode(HttpStatus.OK)
  @Get(":did")
  async getCredentialsViewData(
      @Param("did") did: string,
      @Query("shareUuid") shareUuid: string,
      @Query("password") password: string,
  ): Promise<CredentialsPublicViewDto> {
    const credentials = await this.credentialsRepository.getByDidWithLastChange(did);
    const credentialChange = await this.credentialsChangeRepository.getLastByCredentialsDid(did);

    if (! password || ! shareUuid) throw new ForbiddenException();

    const credentialsShare = await this.credentialsShareRepository.getByUuid(shareUuid);
    // if expired throw exception
    if (credentialsShare.expiresAt < new Date()) throw new CredentialsShareExpiredException();
    // if password is incorrect throw exception
    if (password !== credentialsShare.temporaryPassword) throw new ForbiddenException();

    return CredentialsPublicViewDto.fromCredentials(credentials, credentialChange, credentialsShare.sharedFields);
  }
}
