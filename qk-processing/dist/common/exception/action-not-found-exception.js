"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ActionNotFoundException extends common_1.NotFoundException {
    constructor(id) {
        super(`Action with id ${id} not found.`);
    }
}
exports.ActionNotFoundException = ActionNotFoundException;
//# sourceMappingURL=action-not-found-exception.js.map