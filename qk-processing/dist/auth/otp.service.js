"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const aws_ses_service_1 = require("../aws/aws.ses.service");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
const settings_service_1 = require("../settings/settings.service");
const dto_1 = require("./dto");
let OtpService = class OtpService {
    constructor(prisma, ses, systemSettings) {
        this.prisma = prisma;
        this.ses = ses;
        this.systemSettings = systemSettings;
    }
    async sendOtp(email, rateLimitForOtp) {
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (!user)
            throw new exception_1.UserNotFoundException(email);
        const canBeResentAt = new Date();
        canBeResentAt.setSeconds(canBeResentAt.getSeconds() + rateLimitForOtp);
        const validUntil = new Date();
        validUntil.setSeconds(validUntil.getSeconds() + 60);
        const otp = await this.prisma.oneTimePassword.create({
            data: {
                code: Math.random().toFixed(4).substring(2, 6),
                validUntil: validUntil,
                canBeResentAt: canBeResentAt,
            },
        });
        if ("true" === await this.systemSettings.get("otp.enabled"))
            await this.ses.sendOtpEmail(email, otp.code);
        return new dto_1.OtpResponseDto(otp.uuid, otp.validUntil, otp.canBeResentAt);
    }
    async checkOtp(code, otpUuid) {
        const otp = await this.prisma.oneTimePassword.findUnique({ where: { uuid: otpUuid } });
        if (!otp)
            throw new common_1.NotFoundException("code not found");
        if (new Date() > otp.validUntil)
            throw new common_1.GoneException("code expired");
        if (otp.code !== code)
            throw new common_1.UnprocessableEntityException("incorrect code");
        await this.prisma.oneTimePassword.delete({ where: { uuid: otpUuid } });
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        aws_ses_service_1.AwsSesService,
        settings_service_1.SettingsService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map