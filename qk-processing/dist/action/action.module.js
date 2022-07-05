"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionModule = void 0;
const common_1 = require("@nestjs/common");
const credentials_module_1 = require("../credentials/credentials.module");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_module_1 = require("../upload/upload.module");
const action_controller_1 = require("./action.controller");
const action_repository_1 = require("./action.repository");
const action_service_1 = require("./action.service");
let ActionModule = class ActionModule {
};
ActionModule = __decorate([
    (0, common_1.Module)({
        imports: [upload_module_1.UploadModule, credentials_module_1.CredentialsModule],
        controllers: [action_controller_1.ActionController],
        providers: [
            action_service_1.ActionService,
            prisma_service_1.PrismaService,
            action_repository_1.ActionRepository,
        ],
    })
], ActionModule);
exports.ActionModule = ActionModule;
//# sourceMappingURL=action.module.js.map