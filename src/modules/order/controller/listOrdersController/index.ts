import { ListOrdersUseCase } from "../../useCases/listOrdersUseCase";
import { Request, Response } from "express";

export class ListOrdersController {
  constructor(private listOrdersUseCase: ListOrdersUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await this.listOrdersUseCase.execute();
      return res.status(200).json(orders);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to list orders", error: message });
    }
  }
}
