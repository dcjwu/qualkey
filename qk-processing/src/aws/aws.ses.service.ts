import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SES } from "aws-sdk";

// Create template by executing the command: aws ses create-template --cli-input-json file://emailTemplate.json

@Injectable()
export class AwsSesService {
    @Inject(ConfigService)
  private config: ConfigService;

    private NO_REPLY_EMAIL = "abramov.igor.n@gmail.com";

    public async sendWelcomeUserEmail(recipientEmail: string, name: string, password: string): Promise<void> {
      await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "welcome-user", `{ \"email\":\"${recipientEmail}\", \"name\":\"${name}\", \"password\":\"${password}\" }`);
    }

    public async sendReviewUploadEmail(recipientEmail: string): Promise<void> {
      await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "review-upload");
    }

    public async sendOtpEmail(recipientEmail: string, otp: string): Promise<void> {
      await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "send-otp", `{ \"otp\":\"${otp}\"}`);
    }

    public async sendUploadApproved(recipientEmail: string): Promise<void> {
      await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "upload-approved");
    }

    public async sendUploadRejected(recipientEmail: string): Promise<void> {
      await this.sendEmailTemplate([recipientEmail], this.NO_REPLY_EMAIL, "upload-rejected");
    }

    private async sendEmailTemplate(recipientEmails: string[], senderEmail: string, template: string, templateData?: string): Promise<void> {
      const ses = this.getSES();

      const params = {
        Source: senderEmail,
        Template: template,
        Destination: { ToAddresses: recipientEmails },
        TemplateData: templateData ?? "{\"data\":\"data\"}",
      };

      await new Promise((resolve, reject) => {
        ses.sendTemplatedEmail(params, (err, data) => {
          if (err) {
            Logger.error(err, err.stack);
            reject(err.message);
          } else {
            Logger.debug(`email SENT ${data.MessageId}`);
            resolve(data);
          }
        });
      });
    }

    private getSES(): SES {
      return new SES({
        accessKeyId: this.config.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.config.get("AWS_SECRET_ACCESS_KEY"),
        region: this.config.get("AWS_REGION"),
      });
    }

    // Just a helper function to create email template
    public async createTemplate(): Promise<void> {
      const params = {
        Template: {
          TemplateName: "upload-rejected",
          HtmlPart: "<h1>Hello,</h1><p>The Mass upload has been rejected by one of the institution representatives.</p>",
          SubjectPart: "Mass upload has been rejected!",
        },
      };
      this.getSES().createTemplate(params);

      await new Promise((resolve, reject) => {
        this.getSES().createTemplate(params, (err, data) => {
          if (err) {
            Logger.error(err, err.stack);
            reject(err.message);
          } else {
            Logger.debug(`template CREATED ${data}`);
            resolve(data);
          }
        });
      });
    }
}