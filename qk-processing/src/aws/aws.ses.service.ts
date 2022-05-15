import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SES } from "aws-sdk";

// Create template by executing the command: aws ses create-template --cli-input-json file://emailTemplate.json

@Injectable()
export class AwsSesService {
    @Inject(ConfigService)
  public config: ConfigService;

    async sendEmail(email: string): Promise<void> {
      const ses = new SES({
        accessKeyId: this.config.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.config.get("AWS_SECRET_ACCESS_KEY"),
        region: this.config.get("AWS_REGION"),
      });

      const params = {
        Destination: {
          ToAddresses: [
            email,
          ],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: "There is a mass upload happening at this time, you better review it and then approve or reject.",
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Test email of upload",
          },
        },
        Source: "abramov.igor.n@gmail.com",
      };

      await new Promise((resolve, reject) => {
        ses.sendEmail(params, (err, data) => {
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
}