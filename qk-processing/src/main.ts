import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>("FRONTEND_URL"),
    credentials: true,
  });

  await app.listen(process.env.PROCESSING_PORT);
}

bootstrap();
