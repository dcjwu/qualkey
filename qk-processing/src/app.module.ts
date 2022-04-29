import { AdminModule } from "@adminjs/nestjs";
import { Database, Resource } from "@adminjs/prisma";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import { DMMFClass } from "@prisma/client/runtime";
import AdminJS, { CurrentAdmin } from "adminjs";

import { AuthModule } from "./auth/auth.module";
import { CredentialsModule } from "./credentials/credentials.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

AdminJS.registerAdapter({ Database, Resource });
const prisma = new PrismaClient();
const dmmf = ((prisma as any)._dmmf as DMMFClass);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    AdminModule.createAdmin({
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
        authenticate: async (email: string, password: string) => {
          if (email !== "" && password !== "") {
            const user = await prisma.user.findUnique({ where: { email: email } });
            if (user && user.role === "SUPER_ADMIN") {
              if (bcrypt.compareSync(
                password,
                user?.password,
                (err, res) => {
                  console.log(err, res);
                },
              )) {
                return Promise.resolve<CurrentAdmin>({ email: email });
              }
            }
          }
        },
        cookieName: "admin",
        cookiePassword: "admin",
      },
    }),
    CredentialsModule,
  ],
})
export class AppModule {}
