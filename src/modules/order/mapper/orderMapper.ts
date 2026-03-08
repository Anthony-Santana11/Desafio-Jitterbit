import { OrderEntity } from "../entity/orderEntity";
import { Order, CreateOrderRequest, createOrderInternalSchema } from "../schema/orderSchema";

export class OrderMapper {
  static fromRequest(raw: CreateOrderRequest): OrderEntity {
    const internalParsed = createOrderInternalSchema.safeParse(raw);
    if (internalParsed.success) {
      const d = internalParsed.data;
      return OrderEntity.reconstitute({
        orderId: d.orderId,
        value: d.value,
        creationDate: new Date(d.creationDate),
        items: d.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    }
    // external format (numeroPedido has a suffix that must be stripped)
    const ext = raw as any;
    const orderId = ext.numeroPedido.replace(/-[^-]+$/, "");
    return OrderEntity.create({
      orderId,
      value: ext.valorTotal,
      creationDate: new Date(ext.dataCriacao),
      items: ext.items.map((item: any) => ({
        productId: parseInt(item.idItem, 10),
        quantity: item.quantidadeItem,
        price: item.valorItem,
      })),
    });
  }

  static toDomain(raw: Order): OrderEntity {
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

  static toPersistence(entity: OrderEntity): Order {
    return {
      orderId: entity.orderId,
      value: entity.value,
      creationDate: entity.creationDate,
      items: entity.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }

  static toDTO(entity: OrderEntity): Order {
    return {
      orderId: entity.orderId,
      value: entity.value,
      creationDate: entity.creationDate,
      items: entity.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }
}
