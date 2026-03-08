import { OrderMapper } from "../mapper/orderMapper";
import { OrderRepository } from "../repository/orderRepository";
import { CreateOrderRequest } from "../schema/orderSchema";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(dto: CreateOrderRequest): Promise<void> {
    const order = OrderMapper.fromRequest(dto);
    await this.orderRepository.create(order);
  }
}