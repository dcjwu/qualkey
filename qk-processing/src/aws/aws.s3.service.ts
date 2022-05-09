import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { extname } from "path";

@Injectable()
export class AwsS3Service {
    async upload(file): Promise<string> {
        const filename = `${uuid()}${extname(file.originalname)}`;

        const s3 = this.getS3();
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: String(filename),
            Body: file.buffer,
        };

        await new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                Logger.debug(`UPLOADED file ${filename} to S3`);
                resolve(data);
            });
        });

        return filename;
    }

    async remove(filename): Promise<void> {
        const s3 = this.getS3();

        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: String(filename),
        };

        await new Promise((resolve, reject) => {
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                Logger.debug(`DELETED file ${filename} from S3`);
                resolve(data);
            });
        });
    }

    getS3(): S3 {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
}