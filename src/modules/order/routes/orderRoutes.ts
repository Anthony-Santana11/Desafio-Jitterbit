import { Router } from "express";
import { CreateOrderController } from "../controller/createOrderController";
import { UpdateOrderController } from "../controller/updateOrderController";
import { DeleteOrderController } from "../controller/deleteOrderController";
import { ListOrdersController } from "../controller/listOrdersController";
import { CreateOrderUseCase } from "../useCases/createOrderUseCases";
import { UpdateOrderUseCase } from "../useCases/updateOrderUseCase";
import { DeleteOrderUseCase } from "../useCases/deleteOrderUseCase";
import { ListOrdersUseCase } from "../useCases/listOrdersUseCase";
import { InMemoryOrderRepository } from "../repository/inMemoryOrderRepository";


const orderRepository = new InMemoryOrderRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
const listOrdersUseCase = new ListOrdersUseCase(orderRepository);

const createOrderController = new CreateOrderController(createOrderUseCase);
const updateOrderController = new UpdateOrderController(updateOrderUseCase);
const deleteOrderController = new DeleteOrderController(deleteOrderUseCase);
const listOrdersController = new ListOrdersController(listOrdersUseCase);


const orderRouter = Router();

orderRouter.get("/list", (req, res) => listOrdersController.handle(req, res));
orderRouter.post("/", (req, res) => createOrderController.handle(req, res));
orderRouter.put("/:orderId", (req, res) => updateOrderController.handle(req, res));
orderRouter.delete("/:orderId", (req, res) => deleteOrderController.handle(req, res));

export { orderRouter };
