import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient {
    userAction: any;
    constructor(config: ConfigService);
    cleanDatabase(): Promise<any[]>;
}
