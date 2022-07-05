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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStripeEventProcessor = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const payment_status_update_service_1 = require("./payment.status-update.service");
let PaymentStripeEventProcessor = class PaymentStripeEventProcessor {
    constructor(prisma, paymentStatusUpdateService) {
        this.prisma = prisma;
        this.paymentStatusUpdateService = paymentStatusUpdateService;
    }
    async processEvent(event) {
        switch (event.type) {
            case "payment_intent.created":
                break;
            case "customer.created":
                common_1.Logger.debug(`Adding stripe customer id to user ${event.data.object["email"]}`);
                await this.prisma.user.update({
                    data: { stripeCustomerId: event.data.object["id"] },
                    where: { email: event.data.object["email"] },
                });
                break;
            case "charge.succeeded":
                break;
            case "charge.failed":
                break;
            case "checkout.session.completed":
                await this.paymentStatusUpdateService.toCompleted(event.data.object["client_reference_id"]);
                break;
            case "checkout.session.expired":
                await this.paymentStatusUpdateService.toFailed(event.data.object["client_reference_id"]);
                break;
        }
    }
};
PaymentStripeEventProcessor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payment_status_update_service_1.PaymentStatusUpdateService])
], PaymentStripeEventProcessor);
exports.PaymentStripeEventProcessor = PaymentStripeEventProcessor;
//# sourceMappingURL=payment-stripe-event-processor.service.js.map