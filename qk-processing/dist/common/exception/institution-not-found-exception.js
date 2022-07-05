"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class InstitutionNotFoundException extends common_1.NotFoundException {
    constructor(uuid) {
        super(`Institution with uuid ${uuid} not found.`);
    }
}
exports.InstitutionNotFoundException = InstitutionNotFoundException;
//# sourceMappingURL=institution-not-found-exception.js.map