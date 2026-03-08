import { OrderRepository } from "../repository/orderRepository";

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<void> {
    await this.orderRepository.delete(orderId);
  }
}