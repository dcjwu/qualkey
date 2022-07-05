"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const aws_module_1 = require("../aws/aws.module");
const hedera_module_1 = require("../hedera/hedera.module");
const institution_module_1 = require("../institution/institution.module");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_module_1 = require("../upload/upload.module");
const user_module_1 = require("../user/user.module");
const credentials_notify_consumer_1 = require("./consumer/credentials-notify.consumer");
const credentials_create_consumer_1 = require("./consumer/credentials.create.consumer");
const credentials_upload_to_hedera_consumer_1 = require("./consumer/credentials.upload-to-hedera.consumer");
const credentials_change_service_1 = require("./credentials-change.service");
const credentials_share_service_1 = require("./credentials-share.service");
const credentials_change_request_service_1 = require("./credentials.change-request.service");
const credentials_controller_1 = require("./credentials.controller");
const credentials_public_controller_1 = require("./credentials.public.controller");
const credentials_service_1 = require("./credentials.service");
const credentials_status_update_service_1 = require("./credentials.status-update.service");
const credentials_upload_to_hedera_watcher_1 = require("./credentials.upload-to-hedera.watcher");
const credentials_change_factory_1 = require("./factory/credentials-change.factory");
const credentials_share_factory_1 = require("./factory/credentials-share.factory");
const credentials_withdrawal_request_factory_1 = require("./factory/credentials-withdrawal-request.factory");
const credentials_factory_1 = require("./factory/credentials.factory");
const credentials_public_view_dto_factory_1 = require("./factory/credentials.public-view-dto.factory");
const credentials_event_listener_1 = require("./listener/credentials.event.listener");
const credentials_change_repository_1 = require("./repository/credentials-change.repository");
const credentials_share_repository_1 = require("./repository/credentials-share.repository");
const credentials_change_request_repository_1 = require("./repository/credentials.change-request.repository");
const credentials_repository_1 = require("./repository/credentials.repository");
const credentials_withdrawal_request_repository_1 = require("./repository/credentials.withdrawal-request.repository");
const is_email_array_constraint_1 = require("./validator/is-email-array.constraint");
let CredentialsModule = class CredentialsModule {
};
CredentialsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            hedera_module_1.HederaModule,
            prisma_module_1.PrismaModule,
            upload_module_1.UploadModule,
            institution_module_1.InstitutionModule,
            user_module_1.UserModule,
            aws_module_1.AwsModule,
            bull_1.BullModule.registerQueue({
                name: "credentials-notify",
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
                name: "credentials-upload",
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
        controllers: [credentials_controller_1.CredentialsController, credentials_public_controller_1.CredentialsPublicController],
        exports: [
            credentials_service_1.CredentialsService,
            credentials_change_service_1.CredentialsChangeService,
            credentials_change_request_service_1.CredentialsChangeRequestService,
            credentials_change_repository_1.CredentialsChangeRepository,
            credentials_status_update_service_1.CredentialsStatusUpdateService,
        ],
        providers: [
            credentials_service_1.CredentialsService,
            credentials_repository_1.CredentialsRepository,
            credentials_change_repository_1.CredentialsChangeRepository,
            credentials_factory_1.CredentialsFactory,
            credentials_change_factory_1.CredentialsChangeFactory,
            prisma_service_1.PrismaService,
            credentials_create_consumer_1.CredentialsCreateConsumer,
            credentials_change_service_1.CredentialsChangeService,
            credentials_event_listener_1.CredentialsEventListener,
            credentials_notify_consumer_1.CredentialsNotifyConsumer,
            credentials_withdrawal_request_repository_1.CredentialsWithdrawalRequestRepository,
            credentials_withdrawal_request_factory_1.CredentialsWithdrawalRequestFactory,
            credentials_share_repository_1.CredentialsShareRepository,
            is_email_array_constraint_1.IsEmailArrayConstraint,
            credentials_share_service_1.CredentialsShareService,
            credentials_share_factory_1.CredentialsShareFactory,
            credentials_status_update_service_1.CredentialsStatusUpdateService,
            credentials_change_request_repository_1.CredentialsChangeRequestRepository,
            credentials_change_request_service_1.CredentialsChangeRequestService,
            credentials_public_view_dto_factory_1.CredentialsPublicViewDtoFactory,
            credentials_upload_to_hedera_consumer_1.CredentialsUploadToHederaConsumer,
            credentials_upload_to_hedera_watcher_1.CredentialsUploadToHederaWatcher,
        ],
    })
], CredentialsModule);
exports.CredentialsModule = CredentialsModule;
//# sourceMappingURL=credentials.module.js.map