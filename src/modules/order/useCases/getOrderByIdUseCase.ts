import { OrderMapper } from "../mapper/orderMapper";
import { OrderRepository } from "../repository/orderRepository";
import { Order } from "../schema/orderSchema";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export class GetOrderByIdUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundError(`Order ${orderId} not found`);
    }

    return OrderMapper.toDTO(order);
  }
}
