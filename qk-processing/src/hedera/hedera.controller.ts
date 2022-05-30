import { Controller, Get, Param } from "@nestjs/common";
import { CredentialChange } from "@prisma/client";

import { LogicException } from "../common/exception";
import { CredentialsChangeRepository } from "../credentials/repository/credentials-change.repository";
import { HederaCredentialInfoDto } from "./dto/hedera.credential-info.dto";
import { HederaService } from "./hedera.service";

/**
 * Controller for communicating with Hedera
 */
@Controller("hedera")
export class HederaController {
  constructor(
        private hederaService: HederaService,
        private credentialsChangeRepository: CredentialsChangeRepository,
  ) {}

    /**
     * Get credentials info from the SmartContract
     */
    @Get(":did")
  public async getCredentialsFromSmartContract(
        @Param("did") did: string,
  ): Promise<HederaCredentialInfoDto> {
    const credentialChange: CredentialChange = await this.credentialsChangeRepository.getLastByCredentialsDid(did);

    if (null === credentialChange) throw new LogicException("Credentials were not uploaded to Hedera");

    return await this.hederaService.getCredentialChangeDataFromSmartContract(credentialChange.id, credentialChange.smartContractId);
  }
}
