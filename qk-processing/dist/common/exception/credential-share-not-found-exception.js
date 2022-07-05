"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialShareNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class CredentialShareNotFoundException extends common_1.NotFoundException {
    constructor(uuid) {
        super(`Credential Share with uuid ${uuid} not found.`);
    }
}
exports.CredentialShareNotFoundException = CredentialShareNotFoundException;
//# sourceMappingURL=credential-share-not-found-exception.js.map