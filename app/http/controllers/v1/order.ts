import { Request, Response } from "express";
import { OrderModel } from "../../../models/order";

const createOrder = async (request: Request, response: Response) => {
    try {
        let order = await OrderModel.create({ ...request.body, ...{ user: request.headers["user"] } })
        response.send(order);
    } catch (er) {
        response.send(er)
    }
}


export {
    createOrder
}