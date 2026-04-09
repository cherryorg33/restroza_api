import { Injectable, NestMiddleware } from "@nestjs/common";
import { LoggerService } from "../../modules/logger/logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: any, res: any, next: () => void) {
    this.logger.log(`${req.method} ${req.url}`);
    next();
  }
}
