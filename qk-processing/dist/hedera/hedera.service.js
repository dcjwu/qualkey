"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaService = void 0;
const fs = require("fs");
const did_sdk_js_1 = require("@hashgraph/did-sdk-js");
const sdk_1 = require("@hashgraph/sdk");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
const hedera_credential_info_dto_1 = require("./dto/hedera.credential-info.dto");
let HederaService = class HederaService {
    constructor(prismaService, config) {
        this.prismaService = prismaService;
        this.config = config;
    }
    async writeCredentialChangeToSmartContract(credentialChange) {
        const client = await this.getHederaClient();
        const contractId = await this.getWritableSmartContractId();
        if (await this.isSmartContractContainsCredentials(credentialChange.id, contractId)) {
            common_1.Logger.warn(`Smart Contract ${contractId} already contains credentials ${credentialChange.id}`);
            throw new exception_1.CredentialsAlreadyAddedException(credentialChange.id, contractId);
        }
        try {
            const responseExecuteTransaction = await new sdk_1.ContractExecuteTransaction()
                .setContractId(contractId)
                .setGas(1000000)
                .setFunction("setCredential", new sdk_1.ContractFunctionParameters()
                .addUint32(credentialChange.id)
                .addString(credentialChange.credentialDid)
                .addBytes32(Buffer.from(credentialChange.hash, "hex"))
                .addString(this.config.get("QUALKEY_DID_SERVER") + "/" + credentialChange.credentialDid)
                .addUint32(Math.round(new Date(credentialChange.createdAt).getTime() / 1000)))
                .execute(client);
            const transactionReceipt = await responseExecuteTransaction.getReceipt(client);
            const transactionResponse = await responseExecuteTransaction.getRecord(client);
            await this.prismaService.transaction.create({
                data: {
                    credentialUuid: credentialChange.credentialUuid,
                    fee: transactionResponse.transactionFee.toString(),
                    transactionId: responseExecuteTransaction.transactionId.toString(),
                    smartContractId: contractId,
                    type: "update-smart-contract",
                },
            });
            await this.prismaService.credentialChange.update({ data: { smartContractId: contractId }, where: { id: credentialChange.id } });
            common_1.Logger.debug(`Credential ID: ${credentialChange.id} Transaction ${responseExecuteTransaction.transactionId.toString()} — ${transactionReceipt.status.toString()}`);
        }
        catch (e) {
            common_1.Logger.error(e);
            common_1.Logger.error(`Transaction ${e.transactionId.toString()} — ${e.status.toString()}`);
            if (e.status.toString() === "MAX_CONTRACT_STORAGE_EXCEEDED") {
                await this.prismaService.smartContract.update({
                    data: { status: client_1.SmartContractStatus.STORAGE_EXCEEDED },
                    where: { id: contractId },
                });
            }
            throw e;
        }
    }
    async isSmartContractContainsCredentials(credentialChangeId, smartContractId) {
        const client = await this.getHederaClient();
        try {
            await new sdk_1.ContractCallQuery()
                .setContractId(smartContractId)
                .setGas(1000000)
                .setFunction("getCredential", new sdk_1.ContractFunctionParameters()
                .addUint32(credentialChangeId))
                .setQueryPayment(new sdk_1.Hbar(0.01))
                .execute(client);
        }
        catch (e) {
            if (e.status.toString() === "CONTRACT_REVERT_EXECUTED")
                return false;
            throw new exception_1.LogicException(`Unexpected error ${e.status}`);
        }
        return true;
    }
    async getCredentialChangeDataFromSmartContract(credentialChangeId, smartContractId) {
        const client = await this.getHederaClient();
        try {
            const getCredentialResult = await new sdk_1.ContractCallQuery()
                .setContractId(smartContractId)
                .setGas(1000000)
                .setFunction("getCredential", new sdk_1.ContractFunctionParameters()
                .addUint32(credentialChangeId))
                .setQueryPayment(new sdk_1.Hbar(0.01))
                .execute(client);
            console.log(`DID — ${getCredentialResult.getString(0)}`);
            console.log(`Hash — ${Buffer.from(getCredentialResult.getBytes32(1)).toString("hex")}`);
            console.log(`Link — ${getCredentialResult.getString(2)}`);
            console.log(`Timestamp — ${getCredentialResult.getUint32(3)}`);
            return new hedera_credential_info_dto_1.HederaCredentialInfoDto(getCredentialResult.getString(0), Buffer.from(getCredentialResult.getBytes32(1)).toString("hex"), getCredentialResult.getString(2), new Date(getCredentialResult.getUint32(3) * 1000));
        }
        catch (e) {
            common_1.Logger.error(`Transaction ${e.transactionId.toString()} — ${e.status.toString()}`);
            if (e.status.toString() === "CONTRACT_REVERT_EXECUTED") {
                throw new exception_1.CredentialsChangeNotFoundException(credentialChangeId);
            }
        }
    }
    async getWritableSmartContractId() {
        const smartContract = await this.prismaService.smartContract.findFirst({ where: { status: client_1.SmartContractStatus.ACTIVE } });
        if (!smartContract) {
            throw new exception_1.SmartContractNotFoundException();
        }
        return smartContract.id;
    }
    async createSmartContract() {
        const bytecode = fs.readFileSync("./src/hedera/contract/Qualkey_sol_Qualkey.bin");
        const client = await this.getHederaClient();
        const responseCreateFile = await new sdk_1.FileCreateTransaction()
            .setKeys([client.operatorPublicKey])
            .setContents("")
            .setMaxTransactionFee(new sdk_1.Hbar(5))
            .execute(client);
        const transactionResponse = await responseCreateFile.getRecord(client);
        await this.prismaService.transaction.create({
            data: {
                fee: transactionResponse.transactionFee.toBigNumber().toString(),
                transactionId: responseCreateFile.transactionId.toString(),
                type: "file-create",
            },
        });
        const receipt = await responseCreateFile.getReceipt(client);
        const fileId = receipt.fileId;
        console.log(`file ID = ${fileId.toString()}`);
        const responseAppend = await new sdk_1.FileAppendTransaction()
            .setNodeAccountIds([responseCreateFile.nodeId])
            .setFileId(fileId)
            .setContents(bytecode)
            .setMaxTransactionFee(new sdk_1.Hbar(5))
            .execute(client);
        const transactionResponseAppend = await responseAppend.getRecord(client);
        await this.prismaService.transaction.create({
            data: {
                fee: transactionResponseAppend.transactionFee.toBigNumber().toString(),
                transactionId: responseAppend.transactionId.toString(),
                type: "file-append",
            },
        });
        const contents = await new sdk_1.FileContentsQuery()
            .setFileId(fileId)
            .execute(client);
        console.log(`File content length according to \`FileInfoQuery\`: ${contents.length}`);
        common_1.Logger.debug("Creating new smart contract...");
        const contractTx = await new sdk_1.ContractCreateTransaction()
            .setBytecodeFileId(fileId)
            .setGas(100000);
        const contractResponse = await contractTx.execute(client);
        const contractReceipt = await contractResponse.getReceipt(client);
        const contractRecord = await contractResponse.getRecord(client);
        await this.prismaService.transaction.create({
            data: {
                fee: contractRecord.transactionFee.toBigNumber().toString(),
                transactionId: contractTx.transactionId.toString(),
                type: "contract-create",
            },
        });
        const newSmartContract = await this.prismaService.smartContract.create({ data: { id: contractReceipt.contractId.toString() } });
        common_1.Logger.debug(`New smart contract created ${newSmartContract.id}`);
        return newSmartContract.id;
    }
    async generateDid() {
        try {
            const identityNetwork = this.getHcsIdentityNetwork();
            const did = identityNetwork.generateDid(true).toDid();
            common_1.Logger.debug(`did CREATED ${did}`);
            return did;
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            if (err.name === "TypeError")
                throw new exception_1.LogicException("Something went wrong");
        }
    }
    getHcsIdentityNetwork() {
        const addressBook = new did_sdk_js_1.AddressBook();
        addressBook.setAppnetName(this.config.get("HEDERA_HCS_APPNET_NAME"));
        addressBook.setAppnetDidServers([this.config.get("QUALKEY_DID_SERVER")]);
        addressBook.setDidTopicId(this.config.get("HEDERA_HCS_DID_TOPIC_ID"));
        addressBook.setVcTopicId(this.config.get("HEDERA_HCS_VC_TOPIC_ID"));
        addressBook.setFileId(sdk_1.FileId.fromString(this.config.get("HEDERA_HCS_FILE_ID")));
        return did_sdk_js_1.HcsIdentityNetwork.fromAddressBook(this.config.get("HEDERA_NETWORK"), addressBook);
    }
    async createHcsIdentityNetwork() {
        const client = await this.getHederaClient();
        return await new did_sdk_js_1.HcsIdentityNetworkBuilder()
            .setNetwork(this.config.get("HEDERA_NETWORK"))
            .setNetwork(this.config.get("QUALKEY_DID_SERVER"))
            .setAppnetName("Qualkey")
            .addAppnetDidServer(this.config.get("QUALKEY_DID_SERVER"))
            .setPublicKey(sdk_1.PublicKey.fromString(this.config.get("HEDERA_PUBLIC_KEY")))
            .execute(client);
    }
    async getHederaClient() {
        const accountId = this.config.get("HEDERA_ACCOUNT_ID");
        const privateKey = this.config.get("HEDERA_PRIVATE_KEY");
        const client = sdk_1.Client.forTestnet();
        client.setOperator(accountId, privateKey);
        return client;
    }
};
HederaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], HederaService);
exports.HederaService = HederaService;
//# sourceMappingURL=hedera.service.js.map