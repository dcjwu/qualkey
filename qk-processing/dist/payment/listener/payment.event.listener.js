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
exports.PaymentEventListener = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const credentials_status_update_service_1 = require("../../credentials/credentials.status-update.service");
const event_1 = require("../event");
let PaymentEventListener = class PaymentEventListener {
    constructor(paymentNotifyQueue, credentialsStatusUpdateService) {
        this.paymentNotifyQueue = paymentNotifyQueue;
        this.credentialsStatusUpdateService = credentialsStatusUpdateService;
    }
    async handlePaymentFailedEvent(event) {
        common_1.Logger.debug(`payment FAILED ${event.payment.uuid}`);
        await this.paymentNotifyQueue.add("failed", {
            studentEmail: event.student.email,
            credentialUuids: event.payment.credentialUuids,
        });
    }
    async handlePaymentCompletedEvent(event) {
        common_1.Logger.debug(`payment COMPLETED ${event.payment.uuid}`);
        await this.paymentNotifyQueue.add("completed", {
            studentEmail: event.student.email,
            credentialUuids: event.payment.credentialUuids,
        });
        for (const credentialsUuid of event.payment.credentialUuids) {
            await this.credentialsStatusUpdateService.toActivated(credentialsUuid);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)("payment.failed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.PaymentFailedEvent]),
    __metadata("design:returntype", Promise)
], PaymentEventListener.prototype, "handlePaymentFailedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)("payment.completed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.PaymentCompletedEvent]),
    __metadata("design:returntype", Promise)
], PaymentEventListener.prototype, "handlePaymentCompletedEvent", null);
PaymentEventListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("payment-notify")),
    __metadata("design:paramtypes", [Object, credentials_status_update_service_1.CredentialsStatusUpdateService])
], PaymentEventListener);
exports.PaymentEventListener = PaymentEventListener;
//# sourceMappingURL=payment.event.listener.js.map