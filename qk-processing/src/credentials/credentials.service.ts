import { Injectable, PreconditionFailedException } from "@nestjs/common";
import { Credential, CredentialStatus } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

/**
 * Master class for the work related to credentials
 */
@Injectable()
export class CredentialsService {
  constructor(
        private prisma: PrismaService,
  ) {
  }

  public async toUploadingToBlockchain(credentials: Credential): Promise<Credential> {
    if (credentials.status !== CredentialStatus.NEW) {
      throw new PreconditionFailedException("Wrong status, unable to change status to UPLOADING_TO_BLOCKCHAIN");
    }
    return await this.prisma.credential.update({
      data: { status: CredentialStatus.UPLOADING_TO_BLOCKCHAIN },
      where: { uuid: credentials.uuid },
    });
  }

  public async toFailedUploadingToBlockchain(credentials: Credential): Promise<Credential> {
    if (credentials.status !== CredentialStatus.UPLOADING_TO_BLOCKCHAIN) {
      throw new PreconditionFailedException("Wrong status, unable to change status to FAILED_UPLOADING_TO_BLOCKCHAIN");
    }
    return await this.prisma.credential.update({
      data: { status: CredentialStatus.FAILED_UPLOADING_TO_BLOCKCHAIN },
      where: { uuid: credentials.uuid },
    });
  }

  public async toUploadedToBlockchain(credentials: Credential): Promise<Credential> {
    if (credentials.status === CredentialStatus.UPLOADING_TO_BLOCKCHAIN || credentials.status === CredentialStatus.FAILED_UPLOADING_TO_BLOCKCHAIN) {
      return await this.prisma.credential.update({
        data: { status: CredentialStatus.UPLOADED_TO_BLOCKCHAIN },
        where: { uuid: credentials.uuid },
      });
    }

    throw new PreconditionFailedException(`Wrong status ${credentials.status}, unable to change status to UPLOADED_TO_BLOCKCHAIN`);
  }

  public async toActivated(credentials: Credential): Promise<Credential> {
    if (credentials.status !== CredentialStatus.UPLOADED_TO_BLOCKCHAIN) {
      throw new PreconditionFailedException("Wrong status, unable to change status to ACTIVATED");
    }
    return await this.prisma.credential.update({
      data: { status: CredentialStatus.ACTIVATED },
      where: { uuid: credentials.uuid },
    });
  }

  public async toWithdrawn(credentials: Credential): Promise<Credential> {
    return await this.prisma.credential.update({
      data: { status: CredentialStatus.WITHDRAWN },
      where: { uuid: credentials.uuid },
    });
  }
}
