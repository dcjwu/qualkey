import { PrismaService } from "../prisma/prisma.service";
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    get(name: string): Promise<string>;
}
