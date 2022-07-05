"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use("/payment/webhook", bodyParser.raw({ type: "application/json" }));
    app.use(cookieParser());
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: configService.get("FRONTEND_URL"),
        credentials: true,
    });
    await app.listen(process.env.PROCESSING_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map