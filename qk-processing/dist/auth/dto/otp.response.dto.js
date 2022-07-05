"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpResponseDto = void 0;
class OtpResponseDto {
    constructor(otpUuid, validUntil, canBeResentAt) {
        this.otpUuid = otpUuid;
        this.validUntil = validUntil;
        this.canBeResentAt = canBeResentAt;
    }
}
exports.OtpResponseDto = OtpResponseDto;
//# sourceMappingURL=otp.response.dto.js.map