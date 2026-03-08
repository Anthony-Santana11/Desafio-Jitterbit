interface OrderItemProps {
  productId: number;
  quantity: number;
  price: number;
}

interface OrderProps {
  orderId: string;
  value: number;
  creationDate: Date;
  items: OrderItemProps[];
}

export class OrderEntity {
  readonly orderId: string;
  readonly value: number;
  readonly creationDate: Date;
  readonly items: OrderItemProps[];

  private constructor(props: OrderProps) {
    this.orderId = props.orderId;
    this.value = props.value;
    this.creationDate = props.creationDate;
    this.items = props.items;
  }

  static create(props: {
    orderId: string;
    value: number;
    creationDate: Date;
    items: Array<{ productId: number; quantity: number; price: number }>;
  }): OrderEntity {
    return new OrderEntity({
      orderId: props.orderId,
      value: props.value,
      creationDate: props.creationDate,
      items: props.items,
    });
  }

  static reconstitute(props: OrderProps): OrderEntity {
    return new OrderEntity(props);
  }
}