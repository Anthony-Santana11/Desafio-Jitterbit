import { Router } from "express";
import { CreateOrderController } from "../controller/createOrderController";
import { UpdateOrderController } from "../controller/updateOrderController";
import { DeleteOrderController } from "../controller/deleteOrderController";
import { ListOrdersController } from "../controller/listOrdersController";
import { GetProductByIdController } from "../controller/getProductByIdController";
import { CreateOrderUseCase } from "../useCases/createOrderUseCases";
import { UpdateOrderUseCase } from "../useCases/updateOrderUseCase";
import { DeleteOrderUseCase } from "../useCases/deleteOrderUseCase";
import { ListOrdersUseCase } from "../useCases/listOrdersUseCase";
import { PrismaOrderRepository } from "../repository/prismaOrderRepository";
import { authMiddleware } from "../../../middlewares/authMiddleware";


const orderRepository = new PrismaOrderRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
const listOrdersUseCase = new ListOrdersUseCase(orderRepository);

const createOrderController = new CreateOrderController(createOrderUseCase);
const updateOrderController = new UpdateOrderController(updateOrderUseCase);
const deleteOrderController = new DeleteOrderController(deleteOrderUseCase);
const listOrdersController = new ListOrdersController(listOrdersUseCase);
const getProductByIdController = new GetProductByIdController();


const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.get("/product/:id", (req, res) => getProductByIdController.handle(req, res));
orderRouter.get("/order/list", (req, res) => listOrdersController.handle(req, res));
orderRouter.post("/order", (req, res) => createOrderController.handle(req, res));
orderRouter.put("/order/:orderId", (req, res) => updateOrderController.handle(req, res));
orderRouter.delete("/order/:orderId", (req, res) => deleteOrderController.handle(req, res));

export { orderRouter };
