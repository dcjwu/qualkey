"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class RoleNotFoundException extends common_1.NotFoundException {
    constructor(role) {
        super(`Role not found ${role}`);
    }
}
exports.RoleNotFoundException = RoleNotFoundException;
//# sourceMappingURL=role-not-found.exception.js.map