"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const aws_ses_service_1 = require("../aws/aws.ses.service");
const credentials_status_update_service_1 = require("../credentials/credentials.status-update.service");
const credentials_repository_1 = require("../credentials/repository/credentials.repository");
const settings_service_1 = require("../settings/settings.service");
const payment_notify_consumer_1 = require("./consumer/payment.notify.consumer");
const payment_event_listener_1 = require("./listener/payment.event.listener");
const payment_stripe_event_processor_service_1 = require("./payment-stripe-event-processor.service");
const payment_controller_1 = require("./payment.controller");
const payment_service_1 = require("./payment.service");
const payment_status_update_service_1 = require("./payment.status-update.service");
const payment_webhook_controller_1 = require("./payment.webhook.controller");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: "payment-notify",
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
        controllers: [payment_controller_1.PaymentController, payment_webhook_controller_1.PaymentWebhookController],
        providers: [
            payment_service_1.PaymentService,
            credentials_repository_1.CredentialsRepository,
            settings_service_1.SettingsService,
            payment_stripe_event_processor_service_1.PaymentStripeEventProcessor,
            payment_status_update_service_1.PaymentStatusUpdateService,
            payment_event_listener_1.PaymentEventListener,
            aws_ses_service_1.AwsSesService,
            credentials_status_update_service_1.CredentialsStatusUpdateService,
            payment_notify_consumer_1.PaymentNotifyConsumer,
        ],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=payment.module.js.map