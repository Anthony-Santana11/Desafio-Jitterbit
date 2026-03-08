import { OrderEntity } from "../entity/orderEntity";

export interface OrderRepository {
  create(order: OrderEntity): Promise<void>;
  findById(orderId: string): Promise<OrderEntity | null>;
  findAll(): Promise<OrderEntity[]>;
  update(order: OrderEntity): Promise<void>;
  delete(orderId: string): Promise<void>;
}