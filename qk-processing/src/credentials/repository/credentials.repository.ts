import { Injectable } from "@nestjs/common";
import { Credential, CredentialStatus, User } from "@prisma/client";

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
    const credentials = await this.prismaService.credential.findFirst({
      where:{
        OR: [
          { uuid: uuid },
        ],
        NOT: { status: { equals: CredentialStatus.DELETED } },
      },
    });
    if (null === credentials) throw new CredentialsNotFoundException(uuid);

    return credentials;
  }

  public async getByUuidWithChanges(uuid: string): Promise<Credential> {
    const credentials = await this.prismaService.credential.findFirst({
      where:{
        OR: [
          { uuid: uuid },
        ],
        NOT: { status: { equals: CredentialStatus.DELETED } },
      },
      include: {
        credentialChanges: { orderBy: { changedAt: "desc" } },
        institution: true,
      },
    });
    if (null === credentials) throw new CredentialsNotFoundException(uuid);

    return credentials;
  }

  public async getByDid(did: string): Promise<Credential> {
    const credentials = await this.prismaService.credential.findFirst({
      where:{
        OR: [
          { did:did },
        ],
        NOT: { status: { equals: CredentialStatus.DELETED } },
      },
    });
    if (null === credentials) throw new CredentialsNotFoundException(did);

    return credentials;
  }

  public async getByDidWithLastChange(did: string): Promise<Credential> {
    const credentials = await this.prismaService.credential.findFirst({
      where:{
        OR: [
          { did:did },
        ],
        NOT: { status: { equals: CredentialStatus.DELETED } },
      },
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
          NOT: { status: { equals: CredentialStatus.DELETED } },
        },
      });
    } else {
      return await this.prismaService.credential.findMany({
        where:{
          OR: [
            { studentUuid: user.uuid },
          ],
          NOT: { status: { equals: CredentialStatus.DELETED } },
        },
      });
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
          NOT: { status: { equals: CredentialStatus.DELETED } },
        },
      });
    } else {
      return await this.prismaService.credential.findMany({
        where:{
          OR: [
            { institutionUuid: user.institutionUuid },
          ],
          NOT: { status: { equals: CredentialStatus.DELETED } },
        },
      });
    }
  }
}
