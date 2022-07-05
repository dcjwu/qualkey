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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const settings_service_1 = require("../settings/settings.service");
const auth_service_1 = require("./auth.service");
const decorator_1 = require("./decorator");
const dto_1 = require("./dto");
const guard_1 = require("./guard");
const otp_service_1 = require("./otp.service");
const rateLimitForOtp = 15;
let AuthController = class AuthController {
    constructor(authService, otpService, systemSettings) {
        this.authService = authService;
        this.otpService = otpService;
        this.systemSettings = systemSettings;
    }
    otp(dto) {
        return this.otpService.sendOtp(dto.email, rateLimitForOtp);
    }
    register(dto) {
        return this.authService.register(dto);
    }
    async authWithOtp(dto, response) {
        if ("true" === await this.systemSettings.get("otp.enabled"))
            await this.otpService.checkOtp(dto.otp, dto.otpUuid);
        return this.authService.loginOtp(dto, response);
    }
    async login(dto, response) {
        if ("true" === await this.systemSettings.get("otp.enabled"))
            await this.otpService.checkOtp(dto.otp, dto.otpUuid);
        return this.authService.login(dto, response);
    }
    async checkCredentials(dto) {
        await this.authService.checkCredentials(dto);
    }
    async logout(response) {
        return this.authService.logout(response);
    }
    async checkJwt(request) {
        return this.authService.checkJwt(request);
    }
    async resetPassword(user, dto, response) {
        await this.authService.resetPassword(dto, user.email, response);
    }
    async forgotPassword(user, dto) {
        if (user.email !== dto.email)
            throw new common_1.ForbiddenException();
        await this.authService.forgotPassword(dto);
    }
};
__decorate([
    (0, throttler_1.Throttle)(1, rateLimitForOtp),
    (0, common_1.Post)("otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.OtpRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "otp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("login-otp"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthOtpRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authWithOtp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("check"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthCheckCredentialsRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkCredentials", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("verify"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkJwt", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)("password-reset"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ResetPasswordRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)("password-forgot"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ForgotPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        otp_service_1.OtpService,
        settings_service_1.SettingsService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map