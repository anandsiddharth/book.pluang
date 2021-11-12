import { Order, OrderModel } from "../models/order";

export const findBuyers = async (order: Order): Promise<Order[]> => {

    let orders: Order[] = []

    let quantityCovered = 0;
    let index = 0;
    let FindOrder;
    do {
        try {

            FindOrder = await OrderModel.findOne({
                user: { $ne: order.user },
                type: 'buy',
                price: { $gt: order.price },
                quantity: { $gte: order.quantity },
                status: "pending",
                symbol: order.symbol
            }, {}, { sort: { createdAt: -1 }, skip: index })

            if (FindOrder) {
                index++;
                quantityCovered += FindOrder.quantity
                orders.push()
            }

        } catch (e) {
            console.error(e);
        }

    } while (FindOrder && quantityCovered == order.quantity)

    return orders.reverse();
}