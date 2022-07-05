"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const nestjs_1 = require("@adminjs/nestjs");
const prisma_1 = require("@adminjs/prisma");
const upload_1 = require("@adminjs/upload");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const client_1 = require("@prisma/client");
const adminjs_1 = require("adminjs");
const bcrypt = require("bcryptjs");
const nestjs_command_1 = require("nestjs-command");
const nestjs_stripe_1 = require("nestjs-stripe");
const action_module_1 = require("./action/action.module");
const auth_module_1 = require("./auth/auth.module");
const aws_module_1 = require("./aws/aws.module");
const aws_ses_service_1 = require("./aws/aws.ses.service");
const credentials_module_1 = require("./credentials/credentials.module");
const hedera_module_1 = require("./hedera/hedera.module");
const institution_module_1 = require("./institution/institution.module");
const payment_module_1 = require("./payment/payment.module");
const prisma_module_1 = require("./prisma/prisma.module");
const prisma_service_1 = require("./prisma/prisma.service");
const settings_module_1 = require("./settings/settings.module");
const upload_module_1 = require("./upload/upload.module");
const user_module_1 = require("./user/user.module");
adminjs_1.default.registerAdapter({ Database: prisma_1.Database, Resource: prisma_1.Resource });
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env.local", ".env"] }),
            event_emitter_1.EventEmitterModule.forRoot({ maxListeners: 15 }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            credentials_module_1.CredentialsModule,
            nestjs_1.AdminModule.createAdminAsync({
                imports: [prisma_module_1.PrismaModule, aws_module_1.AwsModule],
                inject: [prisma_service_1.PrismaService, aws_ses_service_1.AwsSesService, config_1.ConfigService],
                useFactory: async (prisma, ses, config) => {
                    const dmmf = prisma._dmmf;
                    return {
                        adminJsOptions: {
                            rootPath: "/admin",
                            resources: [
                                {
                                    resource: { model: dmmf.modelMap.User, client: prisma },
                                    options: {
                                        editProperties: ["email", "role", "firstName", "lastName", "institution", "title", "signature"],
                                        actions: {
                                            new: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                            edit: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                            delete: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                        },
                                    },
                                    features: [
                                        (0, upload_1.default)({
                                            provider: {
                                                aws: {
                                                    region: config.get("AWS_REGION"),
                                                    bucket: config.get("AWS_S3_BUCKET_PUBLIC"),
                                                    accessKeyId: config.get("AWS_ACCESS_KEY_ID"),
                                                    secretAccessKey: config.get("AWS_SECRET_ACCESS_KEY"),
                                                    expires: 0,
                                                },
                                            },
                                            properties: {
                                                file: "signature",
                                                filename: "signatureFile",
                                                filePath: "signatureFilePath",
                                                filesToDelete: "signatureFileToDelete",
                                                key: "signatureUrl",
                                                mimeType: "signatureFileMime",
                                            },
                                            validation: { mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/svg"] },
                                        }),
                                        (0, adminjs_1.buildFeature)({
                                            actions: {
                                                new: {
                                                    after: async (response) => {
                                                        const len = response.record.params.password.length;
                                                        const password = response.record.params.password.substring(len - 8, len);
                                                        common_1.Logger.warn(password);
                                                        await prisma.user.update({
                                                            data: { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) },
                                                            where: { email: response.record.params.email },
                                                        });
                                                        await ses.sendWelcomeUserEmail(response.record.params.email, response.record.params.firstName, password);
                                                        return response;
                                                    },
                                                },
                                            },
                                        }),
                                    ],
                                },
                                {
                                    resource: { model: dmmf.modelMap.Institution, client: prisma },
                                    features: [
                                        (0, upload_1.default)({
                                            provider: {
                                                aws: {
                                                    region: config.get("AWS_REGION"),
                                                    bucket: config.get("AWS_S3_BUCKET_PUBLIC"),
                                                    accessKeyId: config.get("AWS_ACCESS_KEY_ID"),
                                                    secretAccessKey: config.get("AWS_SECRET_ACCESS_KEY"),
                                                    expires: 0,
                                                },
                                            },
                                            properties: {
                                                file: "logo",
                                                filename: "logoFile",
                                                filePath: "logoFilePath",
                                                filesToDelete: "logoFileToDelete",
                                                key: "logoUrl",
                                                mimeType: "logoFileMime",
                                            },
                                            validation: { mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/svg"] },
                                        }),
                                        (0, upload_1.default)({
                                            provider: {
                                                aws: {
                                                    region: config.get("AWS_REGION"),
                                                    bucket: config.get("AWS_S3_BUCKET_PUBLIC"),
                                                    accessKeyId: config.get("AWS_ACCESS_KEY_ID"),
                                                    secretAccessKey: config.get("AWS_SECRET_ACCESS_KEY"),
                                                    expires: 0,
                                                },
                                            },
                                            properties: {
                                                file: "stamp",
                                                filename: "stampFile",
                                                filePath: "stampFilePath",
                                                filesToDelete: "stampFileToDelete",
                                                key: "stampUrl",
                                                mimeType: "stampFileMime",
                                            },
                                            validation: { mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/svg"] },
                                        }),
                                    ],
                                    options: {
                                        editProperties: ["status", "emailDomain", "name", "logo", "stamp"],
                                        actions: {
                                            new: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                            edit: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                            delete: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    resource: { model: dmmf.modelMap.SystemSettings, client: prisma },
                                    options: {
                                        actions: {
                                            new: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                            edit: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                            delete: {
                                                isAccessible: ({ currentAdmin }) => {
                                                    return currentAdmin && (currentAdmin.role === client_1.Role.SUPER_ADMIN);
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    resource: { model: dmmf.modelMap.Transaction, client: prisma },
                                    options: {
                                        actions: {
                                            new: { isAccessible: false },
                                            edit: { isAccessible: false },
                                            delete: { isAccessible: false },
                                        },
                                    },
                                },
                                {
                                    resource: { model: dmmf.modelMap.Payment, client: prisma },
                                    options: {
                                        actions: {
                                            new: { isAccessible: false },
                                            edit: { isAccessible: false },
                                            delete: { isAccessible: false },
                                        },
                                    },
                                },
                            ],
                        },
                        auth: {
                            authenticate: async (email, password) => {
                                if (email !== "" && password !== "") {
                                    const user = await prisma.user.findUnique({ where: { email: email } });
                                    if (user && (user.role === client_1.Role.SUPER_ADMIN || user.role === client_1.Role.ADMIN)) {
                                        if (bcrypt.compareSync(password, user.password, (err, res) => {
                                            common_1.Logger.error(err, res);
                                        })) {
                                            return Promise.resolve({ email: email, role: user.role });
                                        }
                                    }
                                }
                            },
                            cookieName: "admin",
                            cookiePassword: "admin",
                        },
                    };
                },
            }),
            nestjs_redis_1.RedisModule.forRoot({
                closeClient: true,
                config: {
                    host: "redis",
                    port: 6379,
                },
            }),
            bull_1.BullModule.forRoot({
                redis: {
                    host: "redis",
                    port: 6379,
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    ttl: config.get("THROTTLE_TTL"),
                    limit: config.get("THROTTLE_LIMIT"),
                }),
            }),
            nestjs_stripe_1.StripeModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    apiKey: config.get("STRIPE_SECRET_KEY"),
                    apiVersion: "2020-08-27",
                }),
            }),
            upload_module_1.UploadModule,
            aws_module_1.AwsModule,
            hedera_module_1.HederaModule,
            nestjs_command_1.CommandModule,
            action_module_1.ActionModule,
            settings_module_1.SettingsModule,
            payment_module_1.PaymentModule,
            institution_module_1.InstitutionModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map