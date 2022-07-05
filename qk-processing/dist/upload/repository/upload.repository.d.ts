import { Upload } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
export declare class UploadRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getByUuid(uuid: string): Promise<Upload>;
}
