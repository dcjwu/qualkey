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
exports.AwsSesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const settings_service_1 = require("../settings/settings.service");
let AwsSesService = class AwsSesService {
    constructor() {
        this.NO_REPLY_EMAIL = "abramov.igor.n@gmail.com";
    }
    async sendWelcomeUserEmail(recipientEmail, name, password) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "WelcomeEmailWithTempPassTest1", `{ \"email\":\"${recipientEmail}\", \"name\":\"${name}\", \"password\":\"${password}\" }`);
    }
    async sendReviewUploadEmail(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "review-upload");
    }
    async sendReviewWithdrawalEmail(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "review-withdrawal");
    }
    async sendWithdrawalApprovedEmail(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "withdrawal-approved");
    }
    async sendWithdrawalRejectedEmail(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "withdrawal-rejected");
    }
    async sendOtpEmail(recipientEmail, otp) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "SendOtpEmailTempTest2", `{ \"otp\":\"${otp}\"}`);
    }
    async sendUploadApproved(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "upload-approved");
    }
    async sendShareCredentials(recipientEmail, temporaryPassword) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-share", `{ \"temporaryPassword\":\"${temporaryPassword}\"}`);
    }
    async sendCredentialsChangeRequested(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-change-request");
    }
    async sendCredentialsChangedStudent(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-changed-student");
    }
    async sendCredentialsWithdrawnStudent(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-withdrawn-student");
    }
    async sendCredentialsUploaded(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-uploaded");
    }
    async sendCredentialsManipulated(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-manipulated");
    }
    async sendCredentialsChangedRepresentative(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-changed-representative");
    }
    async sendCredentialsChangeRejected(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-change-rejected");
    }
    async sendCredentialsActivated(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "credentials-activated");
    }
    async sendPaymentFailed(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "payment-failed");
    }
    async sendPaymentCompleted(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "payment-completed");
    }
    async sendUploadRejected(recipientEmail) {
        await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "upload-rejected");
    }
    async sendEmailTemplate(recipientEmails, senderEmail, template, templateData) {
        if ("false" === await this.settings.get("emails.enabled")) {
            common_1.Logger.warn(`SENT email to ${recipientEmails[0]} with template: ${template} and data: ${templateData}`);
        }
        else {
            const ses = this.getSES();
            const params = {
                Source: senderEmail,
                Template: template,
                Destination: { ToAddresses: recipientEmails },
                TemplateData: templateData !== null && templateData !== void 0 ? templateData : "{\"data\":\"data\"}",
            };
            await new Promise((resolve, reject) => {
                ses.sendTemplatedEmail(params, (err, data) => {
                    if (err) {
                        common_1.Logger.error(err, err.stack);
                        reject(err.message);
                    }
                    else {
                        common_1.Logger.debug(`email SENT ${data.MessageId}`);
                        resolve(data);
                    }
                });
            });
        }
    }
    getSES() {
        return new aws_sdk_1.SES({
            accessKeyId: this.config.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.config.get("AWS_SECRET_ACCESS_KEY"),
            region: this.config.get("AWS_REGION"),
        });
    }
    async createTemplate() {
        const params = {
            Template: {
                TemplateName: "",
                HtmlPart: "",
                SubjectPart: "",
            },
        };
        this.getSES().createTemplate(params);
        await new Promise((resolve, reject) => {
            this.getSES().createTemplate(params, (err, data) => {
                if (err) {
                    common_1.Logger.error(err, err.stack);
                    reject(err.message);
                }
                else {
                    common_1.Logger.debug(`template CREATED ${data}`);
                    resolve(data);
                }
            });
        });
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], AwsSesService.prototype, "config", void 0);
__decorate([
    (0, common_1.Inject)(settings_service_1.SettingsService),
    __metadata("design:type", settings_service_1.SettingsService)
], AwsSesService.prototype, "settings", void 0);
AwsSesService = __decorate([
    (0, common_1.Injectable)()
], AwsSesService);
exports.AwsSesService = AwsSesService;
//# sourceMappingURL=aws.ses.service.js.map