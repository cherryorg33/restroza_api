import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { InvalidFormException } from "../exceptions/invalid-form.exception";

@Catch(InvalidFormException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidFormException, host: ArgumentsHost) {
    const res: any = host.switchToHttp().getResponse();

    res.status(400).json({
      success: false,
      ...(exception.getResponse() as object),
    });
  }
}
