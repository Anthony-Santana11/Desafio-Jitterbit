import { OrderEntity } from "../entity/orderEntity";

export interface OrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;
  findById(orderId: string): Promise<OrderEntity | null>;
  findAll(): Promise<OrderEntity[]>;
  update(order: OrderEntity): Promise<OrderEntity>;
  delete(orderId: string): Promise<void>;
}