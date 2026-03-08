import { OrderEntity } from "../entity/orderEntity";
import { OrderRepository } from "./orderRepository";
import prisma from "../../../shared/prismaClient";

export class PrismaOrderRepository implements OrderRepository {
  async create(order: OrderEntity): Promise<OrderEntity> {
    await prisma.order.create({
      data: {
        orderId: order.orderId,
        value: order.value,
        creationDate: order.creationDate,
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    return order;
  }

  async findById(orderId: string): Promise<OrderEntity | null> {
    const raw = await prisma.order.findUnique({
      where: { orderId },
      include: { items: true },
    });

    if (!raw) return null;

    return OrderEntity.reconstitute({
      orderId: raw.orderId,
      value: raw.value,
      creationDate: raw.creationDate,
      items: raw.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }

  async findAll(): Promise<OrderEntity[]> {
    const raws = await prisma.order.findMany({
      include: { items: true },
    });

    return raws.map((raw) =>
      OrderEntity.reconstitute({
        orderId: raw.orderId,
        value: raw.value,
        creationDate: raw.creationDate,
        items: raw.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      })
    );
  }

  async update(order: OrderEntity): Promise<OrderEntity> {
    await prisma.order.update({
      where: { orderId: order.orderId },
      data: {
        value: order.value,
        creationDate: order.creationDate,
        items: {
          deleteMany: {},
          create: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    return order;
  }

  async delete(orderId: string): Promise<void> {
    await prisma.order.delete({
      where: { orderId },
    });
  }
}
