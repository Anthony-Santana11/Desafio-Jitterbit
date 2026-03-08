import { CreateOrderUseCase } from "../../useCases/createOrderUseCases";
import { Request, Response } from "express";
import { createOrderRequestSchema } from "../../schema/orderSchema";

export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = createOrderRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.issues });
      }

      await this.createOrderUseCase.execute(parsed.data);
      return res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to create order", error: message });
    }
  }
}