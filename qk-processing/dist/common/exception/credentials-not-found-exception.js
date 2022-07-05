"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class CredentialsNotFoundException extends common_1.NotFoundException {
    constructor(did) {
        super(`Credentials - ${did} not found.`);
    }
}
exports.CredentialsNotFoundException = CredentialsNotFoundException;
//# sourceMappingURL=credentials-not-found-exception.js.map