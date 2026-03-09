import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    error: "InternalServerError",
    message: "An unexpected error occurred",
  });
}
