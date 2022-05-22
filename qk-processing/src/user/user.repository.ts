import * as assert from "assert";

import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

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
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    assert(user !== null, "User should not be null");

    return user;
  }
}