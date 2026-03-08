import { OrderEntity } from "../entity/orderEntity";
import { OrderRepository } from "./orderRepository";

export class InMemoryOrderRepository implements OrderRepository {
  private orders: Map<string, OrderEntity> = new Map();

  async create(order: OrderEntity): Promise<OrderEntity> {
    this.orders.set(order.orderId, order);
    return order;
  }

  async findById(orderId: string): Promise<OrderEntity | null> {
    return this.orders.get(orderId) ?? null;
  }

  async findAll(): Promise<OrderEntity[]> {
    return Array.from(this.orders.values());
  }

  async update(order: OrderEntity): Promise<OrderEntity> {
    if (!this.orders.has(order.orderId)) {
      throw new Error("Order not found");
    }
    this.orders.set(order.orderId, order);
    return order;
  }

  async delete(orderId: string): Promise<void> {
    this.orders.delete(orderId);
  }
}
