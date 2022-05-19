import { HcsIdentityNetworkBuilder } from "@hashgraph/did-sdk-js";
import { Client, ContractCreateTransaction, FileCreateTransaction, PublicKey } from "@hashgraph/sdk";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SmartContractStatus } from "@prisma/client";

import { LogicException } from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";
import * as contract from "./contract/Qualkey.json";

@Injectable()
export class HederaService {
  constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly config: ConfigService,
  ) {
  }

  getCredentialsFromSmartContact(): void {
    console.log("return credentials");
  }

  saveCredentialsToSmartContract(): void {
    console.log("save credentials");
  }

  public async getSmartContractId(): Promise<string> {
    const smartContract = await this.prismaService.smartContract.findFirst({ where: { status: SmartContractStatus.ACTIVE } });
    if (!smartContract) {
      Logger.debug("Creating new smart contract...");
      const client = await this.createHederaClient();

      const bytecode = contract.data.bytecode.object;
      const fileCreateTx = new FileCreateTransaction()
        .setContents(bytecode);
      const submitTx = await fileCreateTx.execute(client);
      const fileReceipt = await submitTx.getReceipt(client);
      const bytecodeFileId = fileReceipt.fileId;

      const contractTx = await new ContractCreateTransaction()
        .setBytecodeFileId(bytecodeFileId)
        .setGas(100000);

      const contractResponse = await contractTx.execute(client);
      const contractReceipt = await contractResponse.getReceipt(client);

      const newSmartContract = await this.prismaService.smartContract.create({ data: { id: contractReceipt.contractId.toString() } });
      Logger.debug(`New smart contract created ${newSmartContract.id}`);
      return newSmartContract.id;
    } else {
      Logger.debug(`Smart contract already in use ${smartContract.id}`);
      return smartContract.id;
    }
  }

  public async generateDid(): Promise<string> {
    const client = await this.createHederaClient();

    const publicKey = this.config.get<string>("HEDERA_PUBLIC_KEY");

    while (true) {
      try {

        const identityNetwork = await new HcsIdentityNetworkBuilder()
          .setNetwork("testnet")
          .setPublicKey(PublicKey.fromString(publicKey))
          .execute(client);

        const did = identityNetwork.generateDid(true).toDid();
        Logger.debug(`did CREATED ${did}`);
        return did;

      } catch (err) {
        Logger.error(err, err.stack);
        if (err.name === "TypeError") throw new LogicException("Something went wrong");
      }
    }
  }

  private async createHederaClient(): Promise<Client> {
    const accountId = this.config.get<string>("HEDERA_ACCOUNT_ID");
    const privateKey = this.config.get<string>("HEDERA_PRIVATE_KEY");

    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);
    return client;
  }
}
