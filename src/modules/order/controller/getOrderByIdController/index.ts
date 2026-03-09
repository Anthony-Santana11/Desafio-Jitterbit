import { Request, Response } from "express";
import { GetOrderByIdUseCase } from "../../useCases/getOrderByIdUseCase";

export class GetOrderByIdController {
  constructor(private getOrderByIdUseCase: GetOrderByIdUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const orderId = req.params.orderId as string;

    const order = await this.getOrderByIdUseCase.execute(orderId);
    return res.status(200).json(order);
  }
}
