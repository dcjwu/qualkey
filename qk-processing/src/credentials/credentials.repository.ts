import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  getStudentCredentials(user: User): string {
    return JSON.stringify(`Student dashboard page! Welcome, ${user.email}`);
  }

  getInstitutionCredentials(user: User): string {
    return JSON.stringify(`Institution dashboard page! Welcome, ${user.email}`);
  }
}
