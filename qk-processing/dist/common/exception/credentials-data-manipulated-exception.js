"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsDataManipulatedException = void 0;
const common_1 = require("@nestjs/common");
class CredentialsDataManipulatedException extends common_1.NotFoundException {
    constructor(id) {
        super(`Credentials data was manipulated, credentials id: ${id}.`);
    }
}
exports.CredentialsDataManipulatedException = CredentialsDataManipulatedException;
//# sourceMappingURL=credentials-data-manipulated-exception.js.map