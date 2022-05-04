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
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const adminjs_1 = require("adminjs");
const auth_module_1 = require("./auth/auth.module");
const credentials_module_1 = require("./credentials/credentials.module");
const prisma_module_1 = require("./prisma/prisma.module");
const prisma_service_1 = require("./prisma/prisma.service");
const user_module_1 = require("./user/user.module");
const bcrypt = require("bcryptjs");
adminjs_1.default.registerAdapter({ Database: prisma_1.Database, Resource: prisma_1.Resource });
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            credentials_module_1.CredentialsModule,
            nestjs_1.AdminModule.createAdminAsync({
                imports: [prisma_module_1.PrismaModule],
                inject: [prisma_service_1.PrismaService],
                useFactory: async (prisma) => {
                    const dmmf = prisma._dmmf;
                    return {
                        adminJsOptions: {
                            rootPath: "/admin",
                            resources: [
                                {
                                    resource: { model: dmmf.modelMap.User, client: prisma },
                                    options: {},
                                },
                            ],
                        },
                        auth: {
                            authenticate: async (email, password) => {
                                if (email !== "" && password !== "") {
                                    const user = await prisma.user.findUnique({ where: { email: email } });
                                    if (user && user.role === "SUPER_ADMIN") {
                                        if (bcrypt.compareSync(password, user === null || user === void 0 ? void 0 : user.password, (err, res) => {
                                            console.log(err, res);
                                        })) {
                                            return Promise.resolve({ email: email });
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
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map