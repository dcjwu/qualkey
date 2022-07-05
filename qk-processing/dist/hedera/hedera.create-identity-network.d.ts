import { HederaService } from "./hedera.service";
export declare class CreateIdentityNetworkCommand {
    private readonly hederaService;
    constructor(hederaService: HederaService);
    create(): Promise<void>;
}
