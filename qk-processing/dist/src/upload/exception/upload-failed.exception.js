"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFailedException = void 0;
const runtime_exception_1 = require("@nestjs/core/errors/exceptions/runtime.exception");
class UploadFailedException extends runtime_exception_1.RuntimeException {
    constructor(filename, reason) {
        super(`Upload failed for file ${filename}: ${reason}`);
    }
}
exports.UploadFailedException = UploadFailedException;
//# sourceMappingURL=upload-failed.exception.js.map