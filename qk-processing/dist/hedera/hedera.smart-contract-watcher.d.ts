import { PrismaService } from "../prisma/prisma.service";
import { HederaService } from "./hedera.service";
export declare class HederaSmartContractWatcher {
    private prisma;
    private hedera;
    constructor(prisma: PrismaService, hedera: HederaService);
    createSmartContractIfNeeded(): Promise<void>;
}
