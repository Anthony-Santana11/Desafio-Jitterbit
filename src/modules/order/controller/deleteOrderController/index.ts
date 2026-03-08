import { DeleteOrderUseCase } from "../../useCases/deleteOrderUseCase";
import { Request, Response } from "express";
import { z } from "zod";

const paramsSchema = z.object({ orderId: z.string() });

export class DeleteOrderController {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = paramsSchema.safeParse(req.params);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid orderId", errors: parsed.error.issues });
      }

      await this.deleteOrderUseCase.execute(parsed.data.orderId);
      return res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to delete order", error: message });
    }
  }
}