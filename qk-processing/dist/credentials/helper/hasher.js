"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const crypto_1 = require("crypto");
class Hasher {
    static hash(string) {
        return (0, crypto_1.createHash)("sha256").update(string).digest("hex");
    }
}
exports.Hasher = Hasher;
//# sourceMappingURL=hasher.js.map