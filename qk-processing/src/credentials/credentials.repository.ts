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

  public async getByUuid(uuid: string, user: User): Promise<{ data: Credential, role: Role }> {
    const credentials = await this.prismaService.credential.findUnique({ where:{ uuid:uuid } });
    assert(null !== credentials, "credentials should not be null");

    if (user.role === Role.STUDENT && user.uuid !== credentials.studentUuid) {
      throw new ForbiddenException();
    }

    if (user.role === Role.INSTITUTION_REPRESENTATIVE && user.institutionUuid !== credentials.institutionUuid) {
      throw new ForbiddenException();
    }

    return {
      data: credentials,
      role: user.role,
    };
  }

  public async getAllForStudent(user: User, filter?: string): Promise<string> {
    if (filter && filter !== "") {
      const data = await this.prismaService.credential.findMany({
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
      return JSON.stringify({
        data,
        role: user.role,
      });
    } else {
      const data = await this.prismaService.credential.findMany({ where:{ studentUuid: user.uuid } });
      return JSON.stringify({
        data,
        role: user.role,
      });
    }
  }

  public async getAllForInstitution(user: User, filter?: string): Promise<string> {
    if (filter && filter !== "") {
      const data = await this.prismaService.credential.findMany({
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
      return JSON.stringify({
        data,
        role: user.role,
      });
    } else {
      const data = await this.prismaService.credential.findMany({ where:{ institutionUuid: user.institutionUuid } });
      return JSON.stringify({
        data,
        role: user.role,
      });
    }
  }
}
