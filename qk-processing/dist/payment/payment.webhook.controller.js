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
exports.PaymentWebhookController = void 0;
const common_1 = require("@nestjs/common");
const payment_stripe_event_processor_service_1 = require("./payment-stripe-event-processor.service");
const payment_service_1 = require("./payment.service");
let PaymentWebhookController = class PaymentWebhookController {
    constructor(paymentService, eventProcessor) {
        this.paymentService = paymentService;
        this.eventProcessor = eventProcessor;
    }
    async handleIncomingWebhooks(signature, raw) {
        if (!signature) {
            throw new common_1.BadRequestException("Missing stripe-signature header");
        }
        const event = this.paymentService.constructEventFromPayload(signature, raw);
        common_1.Logger.log(`Stripe webhook received: ${event.type}, ${event.id}`);
        await this.eventProcessor.processEvent(event);
    }
};
__decorate([
    (0, common_1.Post)("webhook"),
    __param(0, (0, common_1.Headers)("stripe-signature")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Buffer]),
    __metadata("design:returntype", Promise)
], PaymentWebhookController.prototype, "handleIncomingWebhooks", null);
PaymentWebhookController = __decorate([
    (0, common_1.Controller)("payment"),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        payment_stripe_event_processor_service_1.PaymentStripeEventProcessor])
], PaymentWebhookController);
exports.PaymentWebhookController = PaymentWebhookController;
//# sourceMappingURL=payment.webhook.controller.js.map