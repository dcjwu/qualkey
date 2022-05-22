import * as assert from "assert";

import { Injectable } from "@nestjs/common";
import { Credential } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
/**
 * Class responsible for getting credentials from the data sources
 */
@Injectable()
export class CredentialsRepository {
  constructor(
      private prismaService: PrismaService,
  ) {
  }

  public async getByUuid(uuid: string): Promise<Credential> {
    const credentials = await this.prismaService.credential.findUnique({ where:{ uuid:uuid } });
    assert(null !== credentials, "credentials should not be null");

    return credentials;
  }
}
