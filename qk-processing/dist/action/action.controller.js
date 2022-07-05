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
exports.ActionController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const action_repository_1 = require("./action.repository");
const action_service_1 = require("./action.service");
const action_decision_dto_1 = require("./dto/action.decision.dto");
let ActionController = class ActionController {
    constructor(actionService, actionRepository) {
        this.actionService = actionService;
        this.actionRepository = actionRepository;
    }
    async getUserActions(user) {
        if (user.role === client_1.Role.INSTITUTION_REPRESENTATIVE) {
            return await this.actionRepository.getUserActions(user);
        }
        else if (user.role === client_1.Role.STUDENT) {
            return [];
        }
        else
            throw new common_1.ForbiddenException();
    }
    async postDecisionOnUserAction(user, dto) {
        if (user.role !== client_1.Role.INSTITUTION_REPRESENTATIVE)
            throw new common_1.ForbiddenException();
        await this.actionService.processDecision(user, dto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "getUserActions", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, action_decision_dto_1.ActionDecisionDto]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "postDecisionOnUserAction", null);
ActionController = __decorate([
    (0, common_1.Controller)("action"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [action_service_1.ActionService,
        action_repository_1.ActionRepository])
], ActionController);
exports.ActionController = ActionController;
//# sourceMappingURL=action.controller.js.map