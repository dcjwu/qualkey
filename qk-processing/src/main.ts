import AdminJSExpress from "@adminjs/express"
import { Database, Resource } from "@adminjs/prisma"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import AdminJS from "adminjs"

import { AppModule } from "./app.module"
import { PrismaService } from "./prisma/prisma.service"

AdminJS.registerAdapter({ Database, Resource })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const prismaService = app.get(PrismaService)

  const admin = new AdminJS({
    resources: [{
      resource: { model: prismaService.user, client: prismaService },
      options: {},
    }],
  })

  const router = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, router)

  await app.listen(3333)
}

bootstrap()
