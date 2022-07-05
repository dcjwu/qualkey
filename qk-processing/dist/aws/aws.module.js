"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModule = void 0;
const common_1 = require("@nestjs/common");
const settings_module_1 = require("../settings/settings.module");
const aws_s3_service_1 = require("./aws.s3.service");
const aws_ses_service_1 = require("./aws.ses.service");
let AwsModule = class AwsModule {
};
AwsModule = __decorate([
    (0, common_1.Module)({
        imports: [settings_module_1.SettingsModule],
        providers: [aws_s3_service_1.AwsS3Service, aws_ses_service_1.AwsSesService],
        exports: [aws_s3_service_1.AwsS3Service, aws_ses_service_1.AwsSesService],
    })
], AwsModule);
exports.AwsModule = AwsModule;
//# sourceMappingURL=aws.module.js.map