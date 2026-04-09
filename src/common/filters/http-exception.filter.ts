import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { LoggerService } from "../../modules/logger/logger.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const status = exception.getStatus();
    const response: any = exception.getResponse();

    this.logger.error(JSON.stringify(response));

    res.status(status).json({
      success: false,
      ...response,
    });
  }
}
