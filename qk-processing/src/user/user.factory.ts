import * as assert from "assert";

import { Injectable, Logger } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { AwsSesService } from "../aws/aws.ses.service";
import { PrismaService } from "../prisma/prisma.service";
import { PasswordGenerator } from "./helper/password-generator.service";

@Injectable()
export class UserFactory {
  constructor(
        private prisma: PrismaService,
        private passwordGenerator: PasswordGenerator,
        private ses: AwsSesService,
  ) {
  }

  public async createStudent(email: string, fullname: string): Promise<User> {
    assert(email !== "", "email must not be empty");
    assert(fullname !== "", "Full name must not be empty");

    const password = PasswordGenerator.generate(8, true, false);
    await this.ses.sendWelcomeUserEmail(
      email,
      fullname,
      password,
    ).catch(err => {
      Logger.error(err, err.stack);
    });

    return await this.prisma.user.create({
      data: {
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        role: Role.STUDENT,
      },
    });
  }
}