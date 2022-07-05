import { Institution } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class InstitutionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getByUuid(uuid: string): Promise<Institution>;
    getByUuidWithRepresentatives(uuid: string): Promise<Institution>;
}
