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
exports.PaymentStatusUpdateService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const client_1 = require("@prisma/client");
const exception_1 = require("../common/exception");
const prisma_service_1 = require("../prisma/prisma.service");
const event_1 = require("./event");
let PaymentStatusUpdateService = class PaymentStatusUpdateService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async toFailed(uuid) {
        try {
            const payment = await this.checkPaymentStatus(uuid, client_1.PaymentStatus.FAILED);
            await this.prisma.payment.update({
                data: { status: client_1.PaymentStatus.FAILED },
                where: { uuid: uuid },
            });
            common_1.Logger.debug(`Payment ${uuid} status changed to FAILED`);
            const paymentFailedEvent = new event_1.PaymentFailedEvent();
            paymentFailedEvent.payment = payment;
            paymentFailedEvent.student = payment.student;
            this.eventEmitter.emit("payment.failed", paymentFailedEvent);
        }
        catch (err) {
            if (err instanceof common_1.PreconditionFailedException)
                return;
            throw err;
        }
    }
    async toCompleted(uuid) {
        try {
            const payment = await this.checkPaymentStatus(uuid, client_1.PaymentStatus.COMPLETED);
            await this.prisma.payment.update({
                data: { status: client_1.PaymentStatus.COMPLETED },
                where: { uuid: uuid },
            });
            common_1.Logger.debug(`Payment ${uuid} status changed to COMPLETED`);
            const paymentCompletedEvent = new event_1.PaymentCompletedEvent();
            paymentCompletedEvent.payment = payment;
            paymentCompletedEvent.student = payment.student;
            this.eventEmitter.emit("payment.completed", paymentCompletedEvent);
        }
        catch (err) {
            if (err instanceof common_1.PreconditionFailedException)
                return;
            throw err;
        }
    }
    async checkPaymentStatus(uuid, status) {
        const payment = await this.prisma.payment.findUnique({
            where: { uuid: uuid },
            include: { student: true },
        });
        if (null === payment) {
            throw new exception_1.PaymentNotFoundException(uuid);
        }
        if (payment.status === status) {
            throw new common_1.PreconditionFailedException("Payment status already changed.");
        }
        return payment;
    }
};
PaymentStatusUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], PaymentStatusUpdateService);
exports.PaymentStatusUpdateService = PaymentStatusUpdateService;
//# sourceMappingURL=payment.status-update.service.js.map