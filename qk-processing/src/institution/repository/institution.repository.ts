import { Injectable } from "@nestjs/common";
import { Institution, UserStatus } from "@prisma/client";

import { InstitutionNotFoundException } from "../../common/exception";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class InstitutionRepository {
  constructor(
        private readonly prisma: PrismaService,
  ) {}

  public async getByUuid(uuid: string): Promise<Institution> {
    const institution = await this.prisma.institution.findUnique({ where: { uuid: uuid } });
    if (null === institution) throw new InstitutionNotFoundException(uuid);

    return institution;
  }

  public async getByUuidWithRepresentatives(uuid: string): Promise<Institution> {
    const institution = await this.prisma.institution.findUnique({
      where: { uuid: uuid },
      include: { representatives: { where: { status: UserStatus.ACTIVE } } },
    });

    if (null === institution) throw new InstitutionNotFoundException(uuid);

    return institution;
  }
}
