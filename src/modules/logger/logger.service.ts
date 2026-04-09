import { Injectable } from "@nestjs/common";
import { winstonConfig } from "./winston.config";

@Injectable()
export class LoggerService {
  log(message: string) {
    winstonConfig.info(message);
  }

  error(message: string) {
    winstonConfig.error(message);
  }

  warn(message: string) {
    winstonConfig.warn(message);
  }
}
