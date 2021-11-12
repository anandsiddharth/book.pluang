import { Order, OrderModel } from "../models/order";
import { findBuyers } from "./findBuyers";
import { findSellers } from "./findSellers";
import { log } from "./log";

export const trade = async (order: Order) => {
    console.log(`[info] received TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)

    if (order.type == "sell") {
        let orders = await findBuyers(order)

        for (var i = 0; i < orders.length; i++) {
            if (
                orders[i].quantity > orders[i].executedQuantity &&
                order.quantity > order.executedQuantity
            ) {
                let canSell = order.quantity - order.executedQuantity
                let canBuy = orders[i].quantity - orders[i].executedQuantity
                let quantity = 0;
                if (canBuy >= canSell) {
                    quantity = canSell
                }
                if (canBuy < canSell) {
                    quantity = canBuy
                }
                orders[i].executedQuantity += quantity;
                order.executedQuantity += quantity;

                let executePrice = order.price;

                if (orders[i].quantity == orders[i].executedQuantity) {
                    orders[i].status = "completed"
                }
                if (order.quantity == order.executedQuantity) {
                    order.status = "completed"
                }

                await OrderModel.updateOne({ _id: order._id }, {
                    $set: {
                        executedQuantity: order.executedQuantity,
                        status: order.status
                    }
                })
                await OrderModel.updateOne({ _id: orders[i]._id }, {
                    $set: {
                        executedQuantity: orders[i].executedQuantity,
                        status: orders[i].status
                    }
                })

                log(orders[i], order, quantity, executePrice)
            }
        }
    }

    if (order.type == "buy") {
        try {
            let orders = await findSellers(order);
            for (var i = 0; i < orders.length; i++) {
                if (
                    orders[i].quantity > orders[i].executedQuantity &&
                    order.quantity > order.executedQuantity
                ) {
                    let canSell = orders[i].quantity - orders[i].executedQuantity
                    let canBuy = order.quantity - order.executedQuantity
                    let quantity = 0;
                    if (canBuy >= canSell) {
                        quantity = canSell
                    }
                    if (canBuy < canSell) {
                        quantity = canBuy
                    }
                    orders[i].executedQuantity += quantity;
                    order.executedQuantity += quantity;

                    let executePrice = order.price;

                    if (orders[i].quantity == orders[i].executedQuantity) {
                        orders[i].status = "completed"
                    }
                    if (order.quantity == order.executedQuantity) {
                        order.status = "completed"
                    }
                    await OrderModel.updateOne({ _id: order._id }, {
                        $set: {
                            executedQuantity: order.executedQuantity,
                            status: order.status
                        }
                    })
                    await OrderModel.updateOne({ _id: orders[i]._id }, {
                        $set: {
                            executedQuantity: orders[i].executedQuantity,
                            status: orders[i].status
                        }
                    })

                    log(order, orders[i], quantity, executePrice)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    return
}