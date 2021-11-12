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

const getOrders = async (request: Request, response: Response) => {
    try {
        let page: number = parseInt(<string>request.query?.page) || 1
        let limit: number = 10
        let skip = (page - 1) * limit;

        let orders = await OrderModel.find({ user: { $eq: parseInt(<string>request.headers["user"]) } }, {}, { sort: { createdAt: -1 }, skip: skip }).limit(limit)
        response.send(orders);
    } catch (er) {
        response.send(er)
    }
}

export {
    createOrder,
    getOrders
}