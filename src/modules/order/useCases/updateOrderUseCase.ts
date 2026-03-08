import { OrderEntity } from "../entity/orderEntity";
import { OrderRepository } from "../repository/orderRepository";
import { UpdateOrderInput } from "../schema/orderSchema";

export class UpdateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(dto: UpdateOrderInput): Promise<void> {
    const existing = await this.orderRepository.findById(dto.orderId);
    if (!existing) {
      throw new Error("Order not found");
    }

    const updated = OrderEntity.reconstitute({
      orderId: dto.orderId,
      value: dto.value,
      creationDate: existing.creationDate,
      items: dto.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    await this.orderRepository.update(updated);
  }
}