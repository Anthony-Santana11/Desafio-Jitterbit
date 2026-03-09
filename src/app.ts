import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { authRouter } from "./modules/auth/routes/authRoutes";
import { orderRouter } from "./modules/order/routes/orderRoutes";
import { AppError, ValidationError } from "./shared/errors";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(authRouter);
app.use(orderRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ message: err.message, errors: err.issues });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  const message = err instanceof Error ? err.message : "Internal server error";
  return res.status(500).json({ message });
});

export { app };
