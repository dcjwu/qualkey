"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class UploadNotFoundException extends common_1.NotFoundException {
    constructor(uuid) {
        super(`Upload with uuid ${uuid} not found.`);
    }
}
exports.UploadNotFoundException = UploadNotFoundException;
//# sourceMappingURL=upload-not-found-exception.js.map