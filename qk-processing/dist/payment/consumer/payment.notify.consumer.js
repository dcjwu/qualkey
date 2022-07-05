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
exports.PaymentNotifyConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const aws_ses_service_1 = require("../../aws/aws.ses.service");
let PaymentNotifyConsumer = class PaymentNotifyConsumer {
    constructor(ses) {
        this.ses = ses;
    }
    async handleFailed(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.studentEmail}`);
        try {
            await this.ses.sendPaymentFailed(job.data.studentEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCompleted(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.studentEmail}`);
        try {
            await this.ses.sendPaymentCompleted(job.data.studentEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
};
__decorate([
    (0, bull_1.Process)("failed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentNotifyConsumer.prototype, "handleFailed", null);
__decorate([
    (0, bull_1.Process)("completed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentNotifyConsumer.prototype, "handleCompleted", null);
PaymentNotifyConsumer = __decorate([
    (0, bull_1.Processor)("payment-notify"),
    __metadata("design:paramtypes", [aws_ses_service_1.AwsSesService])
], PaymentNotifyConsumer);
exports.PaymentNotifyConsumer = PaymentNotifyConsumer;
//# sourceMappingURL=payment.notify.consumer.js.map