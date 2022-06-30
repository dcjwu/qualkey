import { Injectable } from "@nestjs/common";
import { Credential, CredentialStatus, User, UserStatus } from "@prisma/client";

import { CredentialsNotFoundException } from "../../common/exception";
import { CredentialWithEverythingType } from "../../common/types/credentials/credential-with-everything.type";
import { CredentialsWithCredentialChange } from "../../common/types/credentials/credentials-with-credential-change.type";
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

  public async getByUuidWithChanges(uuid: string): Promise<CredentialWithEverythingType> {
    const credentials = await this.prismaService.credential.findFirst({
      where:{
        OR: [
          { uuid: uuid },
        ],
        NOT: { status: { equals: CredentialStatus.DELETED } },
      },
      include: {
        credentialChanges: { orderBy: { createdAt: "desc" } },
        institution: {
          include: {
            representatives: {
              where: { status: UserStatus.ACTIVE },
              select: {
                firstName: true,
                lastName: true,
                signatureUrl: true,
                title: true,
              },
            },
          },
        },
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
        credentialChanges: { orderBy: { createdAt: "desc" } },
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
        include: {
          credentialChanges: { orderBy: { createdAt: "desc" } },
          institution: true,
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
        include: {
          credentialChanges: { orderBy: { createdAt: "desc" } },
          institution: true,
        },
      });
    }
  }

  public async getAllForInstitution(user: User, offset: number, limit: number, filter?: string): Promise<Credential[]> {
    if (filter && filter !== "") {
      return await this.prismaService.credential.findMany({
        skip: offset,
        take: limit,
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
        include: {
          credentialChanges: { orderBy: { createdAt: "desc" } },
          institution: true,
        },
      });
    } else {
      return await this.prismaService.credential.findMany({
        skip: offset,
        take: limit,
        where:{
          OR: [
            { institutionUuid: user.institutionUuid },
          ],
          NOT: { status: { equals: CredentialStatus.DELETED } },
        },
        include: {
          credentialChanges: { orderBy: { createdAt: "desc" } },
          institution: true,
        },
      });
    }
  }

  public async getAllNewCredentials(): Promise<CredentialsWithCredentialChange> {
    return await this.prismaService.credential.findMany({
      take: 100,
      where: { status: CredentialStatus.NEW },
      orderBy: { createdAt: "asc" },
      include: { credentialChanges: { take: 1, orderBy: { createdAt: "desc" } } },
    });
  }
}
