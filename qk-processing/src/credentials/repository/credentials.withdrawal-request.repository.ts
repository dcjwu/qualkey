import * as assert from "assert";

import { Injectable } from "@nestjs/common";
import { CredentialsWithdrawalRequest } from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";
/**
 * Class responsible for getting credential withdrawal requests from the data sources
 */
@Injectable()
export class CredentialsWithdrawalRequestRepository {
  constructor(
      private prismaService: PrismaService,
  ) {
  }

  public async hasCredentialsUuid(credentialsUuid: string): Promise<boolean> {
    return null !== await this.prismaService.credentialsWithdrawalRequest.findUnique({ where:{ credentialsUuid:credentialsUuid } });
  }

  public async getByUuid(uuid: string): Promise<CredentialsWithdrawalRequest> {
    const credentialsWithdrawalRequest = await this.prismaService.credentialsWithdrawalRequest.findUnique({ where:{ uuid:uuid } });
    assert(null !== credentialsWithdrawalRequest, "credentialsWithdrawalRequest should not be null");

    return credentialsWithdrawalRequest;
  }
}
