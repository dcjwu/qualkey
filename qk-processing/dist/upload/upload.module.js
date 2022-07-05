"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const aws_module_1 = require("../aws/aws.module");
const prisma_service_1 = require("../prisma/prisma.service");
const user_repository_1 = require("../user/user.repository");
const upload_notify_consumer_1 = require("./consumer/upload-notify.consumer");
const upload_event_listener_1 = require("./listener/upload.event.listener");
const csv_parser_1 = require("./parser/csv.parser");
const file_parser_1 = require("./parser/file-parser");
const xlsx_parser_1 = require("./parser/xlsx.parser");
const upload_repository_1 = require("./repository/upload.repository");
const upload_controller_1 = require("./upload.controller");
const upload_service_1 = require("./upload.service");
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            aws_module_1.AwsModule,
            bull_1.BullModule.registerQueue({
                name: "upload-notify",
                limiter: {
                    max: 1000,
                    duration: 1000,
                },
                defaultJobOptions: {
                    attempts: 10,
                    backoff: {
                        type: "exponential",
                        delay: 100000,
                    },
                },
                settings: { retryProcessDelay: 300 },
            }),
            bull_1.BullModule.registerQueue({
                name: "credentials-create",
                limiter: {
                    max: 1000,
                    duration: 1000,
                },
                defaultJobOptions: {
                    attempts: 10,
                    backoff: {
                        type: "exponential",
                        delay: 100000,
                    },
                },
                settings: { retryProcessDelay: 300 },
            }),
        ],
        controllers: [upload_controller_1.UploadController],
        exports: [upload_service_1.UploadService, upload_repository_1.UploadRepository],
        providers: [
            upload_service_1.UploadService,
            upload_event_listener_1.UploadEventListener,
            upload_notify_consumer_1.UploadNotifyConsumer,
            file_parser_1.FileParser,
            xlsx_parser_1.XlsxParser,
            csv_parser_1.CsvParser,
            prisma_service_1.PrismaService,
            user_repository_1.UserRepository,
            upload_repository_1.UploadRepository,
        ],
    })
], UploadModule);
exports.UploadModule = UploadModule;
//# sourceMappingURL=upload.module.js.map