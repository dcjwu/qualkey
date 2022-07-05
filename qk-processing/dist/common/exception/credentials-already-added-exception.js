"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsAlreadyAddedException = void 0;
const common_1 = require("@nestjs/common");
class CredentialsAlreadyAddedException extends common_1.ConflictException {
    constructor(id, smartContractId) {
        super(`Credentials with did ${id} already added to ${smartContractId} smart contract.`);
    }
}
exports.CredentialsAlreadyAddedException = CredentialsAlreadyAddedException;
//# sourceMappingURL=credentials-already-added-exception.js.map