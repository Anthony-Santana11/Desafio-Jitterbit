import { z } from 'zod';


export const createOrderRequestSchema = z.object({
  numeroPedido: z.string(),
  valorTotal: z.number().positive(),
  dataCriacao: z.string(),
  items: z.array(
    z.object({
      idItem: z.string(),
      quantidadeItem: z.number().int().positive(),
      valorItem: z.number().positive(),
    })
  ),
});

export const updateOrderSchema = z.object({
  orderId: z.string(),
  value: z.number().positive(),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
});

export const orderSchema = z.object({
  orderId: z.string(),
  value: z.number().positive(),
  creationDate: z.date(),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
});

export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
export type Order = z.infer<typeof orderSchema>;