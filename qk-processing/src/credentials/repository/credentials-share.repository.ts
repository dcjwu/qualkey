import * as assert from "assert";

import { Injectable } from "@nestjs/common";
import { CredentialShare } from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CredentialsShareRepository {
  constructor(
        private prisma: PrismaService,
  ) {
  }

  public async getByUuid(uuid: string): Promise<CredentialShare> {
    const credentialShare = await this.prisma.credentialShare.findUnique({ where: { uuid: uuid } });
    assert(null !== credentialShare, "credentialShare should not be null");

    return credentialShare;
  }

  public async findByCredentialsUuid(credentialUuid: string): Promise<CredentialShare[]> {
    return await this.prisma.credentialShare.findMany({
      where: { credentialUuid: credentialUuid },
      orderBy: { createdAt: 'desc' },
    });
  }
}