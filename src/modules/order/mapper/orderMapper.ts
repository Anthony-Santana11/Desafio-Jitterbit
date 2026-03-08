import { OrderEntity } from "../entity/orderEntity";
import { Order, CreateOrderRequest } from "../schema/orderSchema";

export class OrderMapper {
  // mapeado de acordo com o exemplo do pdf do desafio, onde o numeroPedido tem um sufixo que deve ser removido para gerar o orderId
  static fromRequest(raw: CreateOrderRequest): OrderEntity {
    const orderId = raw.numeroPedido.replace(/-[^-]+$/, "");
    return OrderEntity.create({
      orderId,
      value: raw.valorTotal,
      creationDate: new Date(raw.dataCriacao),
      items: raw.items.map((item) => ({
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
