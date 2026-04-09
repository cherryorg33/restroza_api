import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidFormException extends HttpException {
  constructor(errors: any) {
    super(
      {
        message: "Invalid form data",
        errors,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
