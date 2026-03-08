import { OrderMapper } from "../mapper/orderMapper";
import { OrderRepository } from "../repository/orderRepository";
import { Order } from "../schema/orderSchema";

export class ListOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders.map((order) => OrderMapper.toDTO(order));
  }
}
