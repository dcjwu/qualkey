import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class CredentialsRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async getStudentCredentials(user: User): Promise<Credential[]> {
        return this.prisma.credential.findMany({
            where: {
                studentUuid: user.uuid,
            },
            orderBy: {
                updatedAt: "asc",
            },
        });
    }

    getInstitutionCredentials(): string {
        return JSON.stringify("Institution dashboard page!");
    }
}
