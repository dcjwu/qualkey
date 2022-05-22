import * as assert from "assert";

import { ForbiddenException, Injectable } from "@nestjs/common";
import { Credential, Role, User } from "@prisma/client";

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

  public async getByUuid(uuid: string, user: User): Promise<Credential> {
    const credentials = await this.prismaService.credential.findUnique({ where:{ uuid:uuid } });
    assert(null !== credentials, "credentials should not be null");

    if (user.role === Role.STUDENT && user.uuid !== credentials.studentUuid) {
      throw new ForbiddenException();
    }

    if (user.role === Role.INSTITUTION_REPRESENTATIVE && user.institutionUuid !== credentials.institutionUuid) {
      throw new ForbiddenException();
    }

    return credentials;
  }

  public async getAllForStudent(user: User, filter?: string): Promise<Credential[]> {
    if (filter && filter !== "") {
      return await this.prismaService.credential.findMany({
        where: {
          OR: [
            { graduatedName: { contains: filter } },
            { awardingInstitution: { contains: filter } },
            { qualificationName: { contains: filter } },
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
            { graduatedName: { contains: filter } },
            { awardingInstitution: { contains: filter } },
            { qualificationName: { contains: filter } },
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
