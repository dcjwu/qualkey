"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsShareExpiredException = void 0;
const common_1 = require("@nestjs/common");
class CredentialsShareExpiredException extends common_1.NotFoundException {
    constructor() {
        super(`Credentials share has expired.`);
    }
}
exports.CredentialsShareExpiredException = CredentialsShareExpiredException;
//# sourceMappingURL=credentials-share-expired-exception.js.map