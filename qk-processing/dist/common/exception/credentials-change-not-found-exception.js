"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsChangeNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class CredentialsChangeNotFoundException extends common_1.NotFoundException {
    constructor(id) {
        super(`Credentials Change with id ${id} not found.`);
    }
}
exports.CredentialsChangeNotFoundException = CredentialsChangeNotFoundException;
//# sourceMappingURL=credentials-change-not-found-exception.js.map