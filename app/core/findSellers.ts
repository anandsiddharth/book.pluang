import { Document } from "mongoose";
import { Order, OrderModel } from "../models/order";

export const findSellers = async (order: Order): Promise<Order[]> => {

    let orders: Order[] = []

    let quantityCovered = 0;
    let index = 0;

    let FindOrder: (Document<any, any, Order> & Order & { _id: string; }) | null = null;
    do {

        try {

            FindOrder = await OrderModel.findOne({
                user: { $ne: order.user },
                type: 'sell',
                price: { $lte: order.price },
                quantity: { $gte: order.quantity },
                status: "pending",
                symbol: order.symbol
            }, {}, { sort: { createdAt: -1 }, skip: index })

            if (FindOrder) {
                index++;
                quantityCovered += FindOrder.quantity
                orders.push(<Order>FindOrder)
            }
        } catch (e) {
            console.log("error", e)
        }

    } while (FindOrder && quantityCovered >= order.quantity)
    return orders.reverse();
}