import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(
    public readonly issues: unknown[],
    message = "Validation failed, please try again with correct data",
  ) {
    super(message, 422);
    this.name = "ValidationError";
  }
}
