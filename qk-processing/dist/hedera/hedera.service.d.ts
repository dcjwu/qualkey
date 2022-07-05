import { HcsIdentityNetwork } from "@hashgraph/did-sdk-js";
import { ConfigService } from "@nestjs/config";
import { CredentialChange } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { HederaCredentialInfoDto } from "./dto/hedera.credential-info.dto";
export declare class HederaService {
    private readonly prismaService;
    private readonly config;
    constructor(prismaService: PrismaService, config: ConfigService);
    writeCredentialChangeToSmartContract(credentialChange: CredentialChange): Promise<void>;
    private isSmartContractContainsCredentials;
    getCredentialChangeDataFromSmartContract(credentialChangeId: number, smartContractId: string): Promise<HederaCredentialInfoDto>;
    getWritableSmartContractId(): Promise<string>;
    createSmartContract(): Promise<string>;
    generateDid(): Promise<string>;
    private getHcsIdentityNetwork;
    createHcsIdentityNetwork(): Promise<HcsIdentityNetwork>;
    private getHederaClient;
}
