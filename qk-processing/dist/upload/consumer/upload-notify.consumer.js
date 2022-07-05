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
exports.UploadNotifyConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const aws_ses_service_1 = require("../../aws/aws.ses.service");
let UploadNotifyConsumer = class UploadNotifyConsumer {
    constructor(ses) {
        this.ses = ses;
    }
    async handlePending(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
        try {
            await this.ses.sendReviewUploadEmail(job.data.representativeEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleApproved(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
        try {
            await this.ses.sendUploadApproved(job.data.representativeEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleRejected(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
        try {
            await this.ses.sendUploadRejected(job.data.representativeEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    onActive(job) {
        common_1.Logger.debug(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
    }
};
__decorate([
    (0, bull_1.Process)("pending"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadNotifyConsumer.prototype, "handlePending", null);
__decorate([
    (0, bull_1.Process)("approved"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadNotifyConsumer.prototype, "handleApproved", null);
__decorate([
    (0, bull_1.Process)("rejected"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadNotifyConsumer.prototype, "handleRejected", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadNotifyConsumer.prototype, "onActive", null);
UploadNotifyConsumer = __decorate([
    (0, bull_1.Processor)("upload-notify"),
    __metadata("design:paramtypes", [aws_ses_service_1.AwsSesService])
], UploadNotifyConsumer);
exports.UploadNotifyConsumer = UploadNotifyConsumer;
//# sourceMappingURL=upload-notify.consumer.js.map