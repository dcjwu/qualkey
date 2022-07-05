import { HederaService } from "./hedera.service";
export declare class CreateSmartContractCommand {
    private readonly hederaService;
    constructor(hederaService: HederaService);
    create(): Promise<void>;
}
