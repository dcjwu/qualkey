import { User } from "@prisma/client";
import { AwsSesService } from "../aws/aws.ses.service";
import { PrismaService } from "../prisma/prisma.service";
import { PasswordGenerator } from "./helper/password-generator.service";
export declare class UserFactory {
    private prisma;
    private passwordGenerator;
    private ses;
    constructor(prisma: PrismaService, passwordGenerator: PasswordGenerator, ses: AwsSesService);
    createStudent(email: string, fullname: string): Promise<User>;
}
