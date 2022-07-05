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
exports.CredentialsNotifyConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const aws_ses_service_1 = require("../../aws/aws.ses.service");
const user_repository_1 = require("../../user/user.repository");
let CredentialsNotifyConsumer = class CredentialsNotifyConsumer {
    constructor(ses, userRepository) {
        this.ses = ses;
        this.userRepository = userRepository;
    }
    async handleWithdrawalApproved(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
        try {
            await this.ses.sendWithdrawalApprovedEmail(job.data.representativeEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleWithdrawalRejected(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
        try {
            await this.ses.sendWithdrawalRejectedEmail(job.data.representativeEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleWithdrawalRequestCreated(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.representativeEmail}`);
        try {
            await this.ses.sendReviewWithdrawalEmail(job.data.representativeEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsShare(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.recipientEmail} with temporaryPassword: ${job.data.temporaryPassword}`);
        try {
            await this.ses.sendShareCredentials(job.data.recipientEmail, job.data.temporaryPassword);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsActivated(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.studentEmail}`);
        try {
            await this.ses.sendCredentialsActivated(job.data.studentEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsChangeRequested(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.recipientEmail}`);
        try {
            await this.ses.sendCredentialsChangeRequested(job.data.recipientEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsChangeRejected(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.recipientEmail}`);
        try {
            await this.ses.sendCredentialsChangeRejected(job.data.recipientEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsChangedRepresentative(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.recipientEmail}`);
        try {
            await this.ses.sendCredentialsChangedRepresentative(job.data.recipientEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsChangedStudent(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.recipientEmail}`);
        try {
            await this.ses.sendCredentialsChangedStudent(job.data.recipientEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsWithdrawnStudent(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.recipientEmail}`);
        try {
            await this.ses.sendCredentialsWithdrawnStudent(job.data.recipientEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsUploaded(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        common_1.Logger.debug(`Sending notification to ${job.data.recipientEmail}`);
        try {
            await this.ses.sendCredentialsUploaded(job.data.recipientEmail);
        }
        catch (err) {
            common_1.Logger.error(err, err.stack);
            return;
        }
        await job.moveToCompleted();
    }
    async handleCredentialsManipulated(job) {
        common_1.Logger.debug(`Handling job ${job.id} of type ${job.name}...`);
        const admins = await this.userRepository.getActiveAdmins();
        for (const admin of admins) {
            common_1.Logger.debug(`Sending notification to ${admin.email}`);
            try {
                await this.ses.sendCredentialsManipulated(admin.email);
            }
            catch (err) {
                common_1.Logger.error(err, err.stack);
                return;
            }
        }
        await job.moveToCompleted();
    }
};
__decorate([
    (0, bull_1.Process)("withdrawal-approved"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleWithdrawalApproved", null);
__decorate([
    (0, bull_1.Process)("withdrawal-rejected"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleWithdrawalRejected", null);
__decorate([
    (0, bull_1.Process)("withdrawal-request-created"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleWithdrawalRequestCreated", null);
__decorate([
    (0, bull_1.Process)("credentials-share"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsShare", null);
__decorate([
    (0, bull_1.Process)("credentials-activated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsActivated", null);
__decorate([
    (0, bull_1.Process)("credentials-change-requested"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsChangeRequested", null);
__decorate([
    (0, bull_1.Process)("credentials-change-rejected"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsChangeRejected", null);
__decorate([
    (0, bull_1.Process)("credentials-changed-representative"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsChangedRepresentative", null);
__decorate([
    (0, bull_1.Process)("credentials-changed-student"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsChangedStudent", null);
__decorate([
    (0, bull_1.Process)("credentials-withdrawn-student"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsWithdrawnStudent", null);
__decorate([
    (0, bull_1.Process)("credentials-uploaded"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsUploaded", null);
__decorate([
    (0, bull_1.Process)("credentials-manipulated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CredentialsNotifyConsumer.prototype, "handleCredentialsManipulated", null);
CredentialsNotifyConsumer = __decorate([
    (0, bull_1.Processor)("credentials-notify"),
    __metadata("design:paramtypes", [aws_ses_service_1.AwsSesService,
        user_repository_1.UserRepository])
], CredentialsNotifyConsumer);
exports.CredentialsNotifyConsumer = CredentialsNotifyConsumer;
//# sourceMappingURL=credentials-notify.consumer.js.map