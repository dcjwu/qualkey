import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

/**
 * Class responsible for getting credentials from the data sources
 */
@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  getStudentCredentials(user: User): string {
    return JSON.stringify({
      value: `Student dashboard page! Welcome, ${user.email}`,
      role: user.role,
    });
  }

  getInstitutionCredentials(user: User): string {
    return JSON.stringify({
      value: `Institution dashboard page! Welcome, ${user.email}`,
      role: user.role,
    });
  }
}
