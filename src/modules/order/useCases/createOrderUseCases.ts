import { OrderMapper } from "../mapper/orderMapper";
import { OrderRepository } from "../repository/orderRepository";
import { CreateOrderRequest } from "../schema/orderSchema";
import { OrderEntity } from "../entity/orderEntity";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(dto: CreateOrderRequest): Promise<OrderEntity> {
    const order = OrderMapper.fromRequest(dto);
    return this.orderRepository.create(order);
  }
}