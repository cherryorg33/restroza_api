import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import cors from "cors";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
// import { API_PREFIX } from "./shared/constants/global.constants";
import { GLOBAL_CONFIG } from "./config/global.config";

import { LoggerService } from "./modules/logger/logger.service";
// import { InvalidFormExceptionFilter } from "./common/exceptions/invalid-form.exception";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import * as dotenv from "dotenv";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"], // ✅ removed duplicate 'error'
  });

  const API_PREFIX = "api/v1";

  // ✅ Global API prefix
  app.setGlobalPrefix(API_PREFIX);

  // ✅ Exception Filters
  dotenv.config();

  // ✅ get logger
  const logger = await app.resolve(LoggerService);

  app.useGlobalFilters(
    new HttpExceptionFilter(logger)
    // new InvalidFormExceptionFilter()
  );

  // ✅ CORS setup
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  // ✅ Cookie parser
  app.use(cookieParser());



  // ✅ Start server
  const PORT = process.env.PORT || GLOBAL_CONFIG.nest.port;

  await app.listen(PORT);

  // ✅ Logger after app starts
  const myLogger = await app.resolve(LoggerService);
  myLogger.log(`🚀 Server started on http://localhost:${PORT}/${API_PREFIX}`);
}

bootstrap();
