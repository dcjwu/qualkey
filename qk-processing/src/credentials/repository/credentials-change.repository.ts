import { Injectable, NotFoundException } from "@nestjs/common";
import { CredentialChange } from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CredentialsChangeRepository {
  constructor(
        private prisma: PrismaService,
  ) {
  }

  public async hasHash(hash: string): Promise<boolean> {
    const credentialsChange = await this.prisma.credentialChange.findUnique({ where: { hash: hash } });

    return (null !== credentialsChange);
  }

  public async getLastByCredentialsUuid(credentialUuid: string): Promise<CredentialChange> {
    const credentialsChange = await this.prisma.credentialChange.findFirst({
      where: { credentialUuid: credentialUuid },
      orderBy: { changedAt: "desc" },
    });

    if (null === credentialsChange) {
      throw new NotFoundException(`There is no CredentialsChange found for credentials: ${credentialUuid}`);
    }

    return credentialsChange;
  }
}