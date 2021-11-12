import { Order, OrderModel } from "../models/Order";

export const matchBuyer = async (order: Order): Promise<Order[]> => {

    let orders: Order[] = []

    let quantityCovered = 0;
    let index = 0;
    let FindOrder;
    do {
        FindOrder = await OrderModel.findOne({
            type: 'buy',
            price: { $gt: order.price },
            quantity: { $gte: order.quantity },
            status: "pending"
        }).sort([{ createdAt: -1 }]).skip(index);

        if (FindOrder) {
            index++;
            quantityCovered += FindOrder.quantity
            orders.push()
        }

    } while (FindOrder && quantityCovered == order.quantity)

    return orders;
}