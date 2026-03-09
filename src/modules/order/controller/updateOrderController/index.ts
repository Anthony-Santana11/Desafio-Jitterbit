import {UpdateOrderUseCase} from "../../useCases/updateOrderUseCase";
import { Request, Response } from "express";
import { updateOrderSchema } from "../../schema/orderSchema";
import { OrderMapper } from "../../mapper/orderMapper";
import { AppError, NotFoundError, ValidationError } from "../../../../shared/errors";

export class UpdateOrderController {
  constructor(private updateOrderUseCase: UpdateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { orderId } = req.params;
      const parsed = updateOrderSchema.safeParse({ ...req.body, orderId });
      if (!parsed.success) {
        throw new ValidationError(parsed.error.issues);
      }

      const order = await this.updateOrderUseCase.execute(parsed.data);
      return res.status(200).json({ message: "Order updated successfully", data: OrderMapper.toDTO(order) });
      
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message, errors: error.issues });
      }
      if (error instanceof NotFoundError || error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to update order", error: message });
    }
  }
}