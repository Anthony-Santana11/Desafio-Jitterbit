import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized, please provide valid credentials") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}
