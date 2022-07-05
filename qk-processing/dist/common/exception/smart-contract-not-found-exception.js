"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class SmartContractNotFoundException extends common_1.NotFoundException {
    constructor() {
        super("Smart Contract with ACTIVE status was not found");
    }
}
exports.SmartContractNotFoundException = SmartContractNotFoundException;
//# sourceMappingURL=smart-contract-not-found-exception.js.map