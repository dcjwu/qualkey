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
exports.CredentialsController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const credentials_service_1 = require("./credentials.service");
let CredentialsController = class CredentialsController {
    constructor(credentialsService) {
        this.credentialsService = credentialsService;
    }
    getCredentials(user) {
        return this.credentialsService.getCredentials(user);
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], CredentialsController.prototype, "getCredentials", null);
CredentialsController = __decorate([
    (0, common_1.Controller)("credentials"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [credentials_service_1.CredentialsService])
], CredentialsController);
exports.CredentialsController = CredentialsController;
//# sourceMappingURL=credentials.controller.js.map