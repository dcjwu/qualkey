"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsChangeRequestAlreadyCreatedException = void 0;
const common_1 = require("@nestjs/common");
class CredentialsChangeRequestAlreadyCreatedException extends common_1.ConflictException {
    constructor(uuid) {
        super(`CredentialsChangeRequest for credentials ${uuid} already created`);
    }
}
exports.CredentialsChangeRequestAlreadyCreatedException = CredentialsChangeRequestAlreadyCreatedException;
//# sourceMappingURL=credentials.change-request.already-created.exception.js.map