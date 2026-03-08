import express from "express";
import { orderRouter } from "./modules/order/routes/orderRoutes";

const app = express();

app.use(express.json());

app.use(orderRouter);

export { app };
