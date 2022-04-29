import { Injectable } from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CredentialsRepository {
    constructor(private prisma: PrismaService) {
    }

    getStudentCredentials():string {
        return JSON.stringify("Student dashboard page!");
    }

    getInstitutionCredentials():string {
        return JSON.stringify("Institution dashboard page!");
    }
}
