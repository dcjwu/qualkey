import { AdminModule, AdminModuleOptions } from "@adminjs/nestjs";
import { Database, Resource } from "@adminjs/prisma";
import uploadFeature from "@adminjs/upload";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { BullModule } from "@nestjs/bull";
import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";
import { Role } from "@prisma/client";
import { DMMFClass } from "@prisma/client/runtime";
import AdminJS, { buildFeature, CurrentAdmin } from "adminjs";
import * as bcrypt from "bcryptjs";
import { CommandModule } from "nestjs-command";
import { StripeModule } from "nestjs-stripe";

import { ActionModule } from "./action/action.module";
import { AuthModule } from "./auth/auth.module";
import { AwsModule } from "./aws/aws.module";
import { AwsSesService } from "./aws/aws.ses.service";
import { CredentialsModule } from "./credentials/credentials.module";
import { HederaModule } from "./hedera/hedera.module";
import { InstitutionModule } from "./institution/institution.module";
import { PaymentModule } from "./payment/payment.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { SettingsModule } from "./settings/settings.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env.local", ".env"] }),
    EventEmitterModule.forRoot({ maxListeners: 15 }),
    AuthModule,
    UserModule,
    PrismaModule,
    CredentialsModule,
    // TODO: Move admin module to separate file
    AdminModule.createAdminAsync({
      imports: [PrismaModule, AwsModule],
      inject: [PrismaService, AwsSesService, ConfigService],
      useFactory: async (prisma: PrismaService, ses: AwsSesService, config: ConfigService): Promise<AdminModuleOptions> => {
        const dmmf = ((prisma as any)._dmmf as DMMFClass);
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
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
                      }, 
                    },
                    edit: {
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
                      }, 
                    },
                    delete: {
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
                      }, 
                    },
                  },
                },
                features: [
                  uploadFeature({
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
                      key: "signatureUrl", // to this db field feature will safe S3 key
                      mimeType: "signatureFileMime", // this property is important because allows to have previews
                    },
                    validation: { mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/svg"] },
                  }),
                  buildFeature({
                    actions: {
                      new: {
                        after: async (response) => {
                          // get first 8 chars of the generated password
                          const len = response.record.params.password.length;
                          const password = response.record.params.password.substring(len - 8, len);
                          Logger.warn(password);
                          // encrypt password and save
                          await prisma.user.update({
                            data: { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) },
                            where: { email: response.record.params.email },
                          });
                          // send notification email
                          await ses.sendWelcomeUserEmail(
                            response.record.params.email,
                            response.record.params.firstName,
                            password,
                          );

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
                  uploadFeature({
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
                      key: "logoUrl", // to this db field feature will safe S3 key
                      mimeType: "logoFileMime", // this property is important because allows to have previews
                    },
                    validation: { mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/svg"] },
                  }),
                  uploadFeature({
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
                      key: "stampUrl", // to this db field feature will safe S3 key
                      mimeType: "stampFileMime", // this property is important because allows to have previews
                    },
                    validation: { mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/svg"] },
                  }),
                ],
                options: {
                  editProperties: ["status", "emailDomain", "name", "logo", "stamp"],
                  actions: {
                    new: {
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
                      }, 
                    },
                    edit: {
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
                      }, 
                    },
                    delete: {
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
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
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
                      },
                    },
                    edit: {
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
                      },
                    },
                    delete: {
                      isAccessible: ({ currentAdmin }): boolean => {
                        return currentAdmin && ( currentAdmin.role === Role.SUPER_ADMIN );
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
            authenticate: async (email: string, password: string): Promise<CurrentAdmin> => {
              if (email !== "" && password !== "") {
                const user = await prisma.user.findUnique({ where: { email: email } });
                if (user && (user.role === Role.SUPER_ADMIN || user.role === Role.ADMIN)) {
                  if (bcrypt.compareSync(
                    password,
                    user.password,
                    (err, res) => {
                      Logger.error(err, res);
                    },
                  )) {
                    return Promise.resolve<CurrentAdmin>({ email: email, role: user.role });
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
    RedisModule.forRoot({
      closeClient: true,
      config: {
        host: "redis",
        port: 6379,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: "redis",
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get("THROTTLE_TTL"),
        limit: config.get("THROTTLE_LIMIT"),
      }),
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get("STRIPE_SECRET_KEY"),
        apiVersion: "2020-08-27",
      }),
    }),
    UploadModule,
    AwsModule,
    HederaModule,
    CommandModule,
    ActionModule,
    SettingsModule,
    PaymentModule,
    InstitutionModule,
  ],
})
export class AppModule {
}
