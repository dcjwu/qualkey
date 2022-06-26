import * as assert from "assert";

import { Injectable } from "@nestjs/common";
import { User, Role, UserStatus } from "@prisma/client";

import { LogicException } from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(
        private prisma: PrismaService,
  ) {
  }

  public async has(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    return (null !== user);
  }

  public async get(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { institution: true },
    });
    assert(user !== null, "User should not be null");

    return user;
  }

  public async getByUuid(uuid: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: uuid },
      include: { institution: true },
    });    assert(user !== null, "User should not be null");

    return user;
  }

  public async getActiveAdmins(): Promise<User[]> {
    const admins = await this.prisma.user.findMany({
      where:{
        OR: [
          { role: Role.ADMIN },
          { role: Role.SUPER_ADMIN },
        ],
        AND: { status: { equals: UserStatus.ACTIVE } },
      },
    });

    if (0 === admins.length) {
      throw new LogicException("There should be at least one admin");
    }

    return admins;
  }
}