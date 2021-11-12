import { Router } from 'express';
import { createOrder, getOrders } from '../app/http/controllers/v1/order';
import { authMiddleware } from '../app/http/middleware/v1/auth';

const v1 = Router();

v1.use(authMiddleware)

v1.post("/orders", createOrder)
v1.get("/orders", getOrders)

export { v1 }