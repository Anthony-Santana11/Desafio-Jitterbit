import { DeleteOrderUseCase } from "../../useCases/deleteOrderUseCase";
import { Request, Response } from "express";
import { z } from "zod";
import { AppError, ValidationError } from "../../../../shared/errors";

const paramsSchema = z.object({ orderId: z.string() });

export class DeleteOrderController {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = paramsSchema.safeParse(req.params);
      if (!parsed.success) {
        throw new ValidationError(parsed.error.issues, "Invalid orderId");
      }

      await this.deleteOrderUseCase.execute(parsed.data.orderId);
      return res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message, errors: error.issues });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to delete order", error: message });
    }
  }
}