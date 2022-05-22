import { Injectable } from "@nestjs/common";
import { Credential, CredentialChange } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CredentialsChangeFactory {
  constructor(
        private prisma: PrismaService,
  ) {
  }

  public async create(credentials: Credential, hash: string): Promise<CredentialChange> {
    return this.prisma.credentialChange.create({
      data: {
        credentialDid: credentials.did,
        credentialUuid: credentials.uuid,
        hash: hash,
      },
    });
  }
}