import { Injectable } from "@nestjs/common";
import { CredentialShare } from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";
import { PasswordGenerator } from "../../user/helper/password-generator.service";
import { CredentialsShareRequestDto } from "../dto";

/**
 * Factory for creation of CredentialShare objects
 */
@Injectable()
export class CredentialsShareFactory {
  constructor(
        private prisma: PrismaService,
  ) {
  }

  public async create(dto: CredentialsShareRequestDto, credentialUuid: string): Promise<CredentialShare> {
    return this.prisma.credentialShare.create({
      data: {
        recipientEmails: dto.recipientEmails,
        credentialUuid: credentialUuid,
        sharedFields: dto.sharedFields,
        temporaryPassword: PasswordGenerator.generate(4, true,false),
        expiresAt: new Date(dto.expiresAt),
      },
    });
  }
}