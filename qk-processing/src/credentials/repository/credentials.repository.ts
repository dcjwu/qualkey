import * as assert from "assert";

import { Injectable } from "@nestjs/common";
import { Credential, User } from "@prisma/client";

import { CredentialsNotFoundException } from "../../common/exception";
import { PrismaService } from "../../prisma/prisma.service";
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

  public async getByUuidWithChanges(uuid: string): Promise<Credential> {
    const credentials = await this.prismaService.credential.findUnique({
      where:{ uuid:uuid },
      include: {
        credentialChanges: { orderBy: { changedAt: "desc" } },
        institution: true,
      },
    });
    assert(null !== credentials, "credentials should not be null");

    return credentials;
  }

  public async getByDid(did: string): Promise<Credential> {
    const credentials = await this.prismaService.credential.findUnique({ where:{ did:did } });
    if (null === credentials) throw new CredentialsNotFoundException(did);

    return credentials;
  }

  public async getByDidWithLastChange(did: string): Promise<Credential> {
    const credentials = await this.prismaService.credential.findUnique({
      where:{ did:did },
      include: {
        credentialChanges: { orderBy: { changedAt: "desc" } },
        institution: true,
      },
    });
    if (null === credentials) throw new CredentialsNotFoundException(did);

    return credentials;
  }

  public async getAllForStudent(user: User, filter?: string): Promise<Credential[]> {
    if (filter && filter !== "") {
      return await this.prismaService.credential.findMany({
        where: {
          OR: [
            { graduatedName: { contains: filter, mode: "insensitive" } },
            { awardingInstitution: { contains: filter, mode: "insensitive" } },
            { qualificationName: { contains: filter, mode: "insensitive" } },
          ],
          AND: [
            { studentUuid: user.uuid },
          ],
        },
      });
    } else {
      return await this.prismaService.credential.findMany({ where:{ studentUuid: user.uuid } });
    }
  }

  public async getAllForInstitution(user: User, filter?: string): Promise<Credential[]> {
    if (filter && filter !== "") {
      return await this.prismaService.credential.findMany({
        where: {
          OR: [
            { graduatedName: { contains: filter, mode: "insensitive" } },
            { awardingInstitution: { contains: filter, mode: "insensitive" } },
            { qualificationName: { contains: filter, mode: "insensitive" } },
          ],
          AND: [
            { institutionUuid: user.institutionUuid },
          ],
        },
      });
    } else {
      return await this.prismaService.credential.findMany({ where:{ institutionUuid: user.institutionUuid } });
    }
  }
}
