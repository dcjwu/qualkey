"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class PaymentNotFoundException extends common_1.NotFoundException {
    constructor(uuid) {
        super(`Payment ${uuid} was not found`);
    }
}
exports.PaymentNotFoundException = PaymentNotFoundException;
//# sourceMappingURL=payment-not-found-exception.js.map