import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found incorrect address") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
