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
exports.AwsS3Service = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
let AwsS3Service = class AwsS3Service {
    async upload(file) {
        const filename = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
        const s3 = this.getS3();
        const params = {
            Bucket: this.config.get("AWS_S3_BUCKET"),
            Key: String(filename),
            Body: file.buffer,
        };
        await new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    common_1.Logger.error(err, err.stack);
                    reject(err.message);
                }
                else {
                    common_1.Logger.debug(`UPLOADED file ${filename} to S3`);
                    resolve(data);
                }
            });
        });
        return filename;
    }
    async remove(filename) {
        const s3 = this.getS3();
        const params = {
            Bucket: this.config.get("AWS_S3_BUCKET"),
            Key: String(filename),
        };
        await new Promise((resolve, reject) => {
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    common_1.Logger.error(err, err.stack);
                    reject(err.message);
                }
                else {
                    common_1.Logger.debug(`DELETED file ${filename} from S3`);
                    resolve(data);
                }
            });
        });
    }
    get(filename) {
        const s3 = this.getS3();
        const params = {
            Bucket: this.config.get("AWS_S3_BUCKET"),
            Key: String(filename),
        };
        return s3.getObject(params).createReadStream();
    }
    getS3() {
        return new aws_sdk_1.S3({
            accessKeyId: this.config.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.config.get("AWS_SECRET_ACCESS_KEY"),
        });
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], AwsS3Service.prototype, "config", void 0);
AwsS3Service = __decorate([
    (0, common_1.Injectable)()
], AwsS3Service);
exports.AwsS3Service = AwsS3Service;
//# sourceMappingURL=aws.s3.service.js.map