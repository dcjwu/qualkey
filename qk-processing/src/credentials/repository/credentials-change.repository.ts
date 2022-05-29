import { Injectable } from "@nestjs/common";

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
}