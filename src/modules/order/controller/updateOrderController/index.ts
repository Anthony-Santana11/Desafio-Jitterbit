import {UpdateOrderUseCase} from "../../useCases/updateOrderUseCase";
import { Request, Response } from "express";
import { updateOrderSchema } from "../../schema/orderSchema";

export class UpdateOrderController {
  constructor(private updateOrderUseCase: UpdateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = updateOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.issues });
      }

      await this.updateOrderUseCase.execute(parsed.data);
      return res.status(200).json({ message: "Order updated successfully" });
      
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to update order", error: message });
    }
  }
}