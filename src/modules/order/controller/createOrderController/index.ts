import { CreateOrderUseCase } from "../../useCases/createOrderUseCases";
import { Request, Response } from "express";
import { createOrderRequestSchema } from "../../schema/orderSchema";
import { OrderMapper } from "../../mapper/orderMapper";
import { AppError, ValidationError } from "../../../../shared/errors";

export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = createOrderRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new ValidationError(parsed.error.issues);
      }

      const order = await this.createOrderUseCase.execute(parsed.data);
      return res.status(201).json({
        message: "Order created successfully",
        data: OrderMapper.toDTO(order),
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message, errors: error.issues });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      if (error instanceof Error && (error as any).code === "P2002") {
        return res.status(409).json({ message: "Order already exists" });
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to create order", error: message });
    }
  }
}