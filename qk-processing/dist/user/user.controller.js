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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const user_change_setting_dto_1 = require("./dto/user.change-setting.dto");
const user_repository_1 = require("./user.repository");
const user_setting_service_1 = require("./user.setting.service");
let UserController = class UserController {
    constructor(userRepository, userSettingService) {
        this.userRepository = userRepository;
        this.userSettingService = userSettingService;
    }
    async getMe(user) {
        return this.userRepository.get(user.email);
    }
    async changeSetting(user, dto) {
        await this.userSettingService.changeUserSetting(user, dto);
    }
};
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)("setting"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_change_setting_dto_1.UserChangeSettingDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeSetting", null);
UserController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_setting_service_1.UserSettingService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map