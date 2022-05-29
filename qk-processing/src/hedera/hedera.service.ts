import * as fs from "fs";

import { AddressBook, HcsIdentityNetwork, HcsIdentityNetworkBuilder } from "@hashgraph/did-sdk-js";
import {
  Client, ContractCallQuery,
  ContractCreateTransaction,
  ContractExecuteTransaction, ContractFunctionParameters, FileAppendTransaction, FileContentsQuery,
  FileCreateTransaction,
  FileId, Hbar,
  PublicKey,
} from "@hashgraph/sdk";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SmartContractStatus, CredentialChange } from "@prisma/client";

import {
  CredentialsAlreadyAddedException,
  CredentialsChangeNotFoundException,
  LogicException,
  SmartContractNotFoundException,
} from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Master class for working with Hedera API
 */
@Injectable()
export class HederaService {
  constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly config: ConfigService,
  ) {
  }

  /**
   * Here we save credentialChange data to smart contract
   */
  public async writeCredentialChangeToSmartContract(credentialChange: CredentialChange): Promise<void> {
    const client = await this.getHederaClient();
    const contractId = await this.getWritableSmartContractId();

    if (await this.isSmartContractContainsCredentials(credentialChange.id, contractId)) {
      Logger.warn(`Smart Contract ${contractId} already contains credentials ${credentialChange.id}`);
      throw new CredentialsAlreadyAddedException(credentialChange.id, contractId);
    }

    try {
      const responseExecuteTransaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction("setCredential", new ContractFunctionParameters()
          .addUint32(credentialChange.id)
          .addString(credentialChange.credentialDid)
          .addBytes32(Buffer.from(credentialChange.hash, "hex"))
          .addString(this.config.get<string>("QUALKEY_DID_SERVER")+"/"+credentialChange.credentialDid)
          .addUint32(Math.round(credentialChange.changedAt.getTime() / 1000)))
        .execute(client);
      const transactionReceipt = await responseExecuteTransaction.getReceipt(client);

      await this.prismaService.credentialChange.update({ data: { smartContractId: contractId }, where: { id: credentialChange.id } });

      Logger.debug(`Credential ID: ${credentialChange.id} Transaction ${responseExecuteTransaction.transactionId.toString()} — ${transactionReceipt.status.toString()}`);
    } catch (e) {
      Logger.error(`Transaction ${e.transactionId.toString()} — ${e.status.toString()}`);
      if (e.status.toString() === "MAX_CONTRACT_STORAGE_EXCEEDED") {
        await this.prismaService.smartContract.update({
          data: { status: SmartContractStatus.STORAGE_EXCEEDED },
          where: { id: contractId },
        });
      }

      throw e;
    }
  }

  /**
   * Check if Smart Contract already contains Credentials
   */
  private async isSmartContractContainsCredentials(credentialChangeId: number, smartContractId: string): Promise<boolean> {
    const client = await this.getHederaClient();

    try {
      await new ContractCallQuery()
        .setContractId(smartContractId)
        .setGas(1000000)
        .setFunction("getCredential", new ContractFunctionParameters()
          .addUint32(credentialChangeId))
        .setQueryPayment(new Hbar(0.01))
        .execute(client);
    } catch (e) {
      if (e.status.toString() === "CONTRACT_REVERT_EXECUTED") return false;

      throw new LogicException(`Unexpected error ${e.status}`);
    }
    return true;
  }

  /**
   * Here we get credentialChange data from smart contract. For testing purposes
   */
  public async getCredentialChangeDataFromSmartContract(credentialChangeId: number, smartContractId: string): Promise<void> {
    const client = await this.getHederaClient();

    try {
      const getCredentialResult = await new ContractCallQuery()
        .setContractId(smartContractId)
        .setGas(1000000)
        .setFunction("getCredential", new ContractFunctionParameters()
          .addUint32(credentialChangeId))
        .setQueryPayment(new Hbar(0.01))
        .execute(client);

      console.log(`DID — ${getCredentialResult.getString(0)}`);
      console.log(`Hash — ${Buffer.from(getCredentialResult.getBytes32(1)).toString("hex")}`);
      console.log(`Link — ${getCredentialResult.getString(2)}`);
      console.log(`Timestamp — ${getCredentialResult.getUint32(3)}`);
    } catch (e) {
      Logger.error(`Transaction ${e.transactionId.toString()} — ${e.status.toString()}`);

      if (e.status.toString() === "CONTRACT_REVERT_EXECUTED") {
        throw new CredentialsChangeNotFoundException(credentialChangeId);
      }
    }
  }

  /**
   * Get smart contract which is not full yet
   */
  public async getWritableSmartContractId(): Promise<string> {
    const smartContract = await this.prismaService.smartContract.findFirst({ where: { status: SmartContractStatus.ACTIVE } });
    if (!smartContract) {
      throw new SmartContractNotFoundException();
    }

    return smartContract.id;
  }

  /**
   * Create smart contract
   */
  public async createSmartContract(): Promise<string> {
    const bytecode = fs.readFileSync("./src/hedera/contract/Qualkey_sol_Qualkey.bin");
    const client = await this.getHederaClient();

    // Save binary file
    const resp = await new FileCreateTransaction()
      .setKeys([client.operatorPublicKey])
      .setContents("")
      .setMaxTransactionFee(new Hbar(5))
      .execute(client);

    const receipt = await resp.getReceipt(client);
    const fileId = receipt.fileId;

    console.log(`file ID = ${fileId.toString()}`);

    await (
      await new FileAppendTransaction()
        .setNodeAccountIds([resp.nodeId])
        .setFileId(fileId)
        .setContents(bytecode)
        .setMaxTransactionFee(new Hbar(5))
        .execute(client)
    ).getReceipt(client);

    const contents = await new FileContentsQuery()
      .setFileId(fileId)
      .execute(client);

    console.log(
      `File content length according to \`FileInfoQuery\`: ${contents.length}`,
    );

    Logger.debug("Creating new smart contract...");

    const contractTx = await new ContractCreateTransaction()
      .setBytecodeFileId(fileId)
      .setGas(100000);

    const contractResponse = await contractTx.execute(client);
    const contractReceipt = await contractResponse.getReceipt(client);

    const newSmartContract = await this.prismaService.smartContract.create({ data: { id: contractReceipt.contractId.toString() } });
    Logger.debug(`New smart contract created ${newSmartContract.id}`);
    return newSmartContract.id;
  }

  /**
   * Here we generate DID for credentials
   */
  public async generateDid(): Promise<string> {
    try {
      const identityNetwork = this.getHcsIdentityNetwork();

      const did = identityNetwork.generateDid(true).toDid();
      Logger.debug(`did CREATED ${did}`);
      return did;

    } catch (err) {
      Logger.error(err, err.stack);
      if (err.name === "TypeError") throw new LogicException("Something went wrong");
    }
  }

  /**
   * Here we get existing Hedera Consensus Service Identity Network in order to generate DID using it
   */
  private getHcsIdentityNetwork(): HcsIdentityNetwork {
    const addressBook = new AddressBook();
    addressBook.setAppnetName(this.config.get<string>("HEDERA_HCS_APPNET_NAME"));
    addressBook.setAppnetDidServers([this.config.get<string>("QUALKEY_DID_SERVER")]);
    addressBook.setDidTopicId(this.config.get<string>("HEDERA_HCS_DID_TOPIC_ID"));
    addressBook.setVcTopicId(this.config.get<string>("HEDERA_HCS_VC_TOPIC_ID"));
    addressBook.setFileId(FileId.fromString(this.config.get<string>("HEDERA_HCS_FILE_ID")));

    return HcsIdentityNetwork.fromAddressBook(this.config.get<string>("HEDERA_NETWORK"), addressBook);
  }

  /**
   * Create Hedera Consensus Service Identity Network in order to generate DID using it later. Only one-time function
   */
  public async createHcsIdentityNetwork(): Promise<HcsIdentityNetwork> {
    const client = await this.getHederaClient();

    return await new HcsIdentityNetworkBuilder()
      .setNetwork(this.config.get<string>("HEDERA_NETWORK"))
      .setNetwork(this.config.get<string>("QUALKEY_DID_SERVER"))
      .setAppnetName("Qualkey")
      .addAppnetDidServer(this.config.get<string>("QUALKEY_DID_SERVER"))
      .setPublicKey(PublicKey.fromString(this.config.get<string>("HEDERA_PUBLIC_KEY")))
      .execute(client);
  }

  /**
   * Get http client to be able to call Hedera API
   */
  private async getHederaClient(): Promise<Client> {
    const accountId = this.config.get<string>("HEDERA_ACCOUNT_ID");
    const privateKey = this.config.get<string>("HEDERA_PRIVATE_KEY");

    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);
    return client;
  }
}
