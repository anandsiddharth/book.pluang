import { Order, OrderModel } from "../models/order";
import { findBuyers } from "./findBuyers";
import { findSellers } from "./findSellers";
import { log } from "./log";

export const trade = async (order: Order) => {
    console.log(`[info] received TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)
    console.log(`[info] finding TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)

    if (order.type == "sell") {
        let orders = await findBuyers(order)

        for (var i = 0; i < orders.length; i++) {
            if (
                orders[i].quantity < orders[i].executedQuantity &&
                order.quantity < order.executedQuantity
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

                let avgExecutedPrice = (orders[i].price + order.price) / 2

                if (orders[i].quantity == orders[i].executedQuantity) {
                    orders[i].status = "completed"
                }
                if (order.quantity == order.executedQuantity) {
                    order.status = "completed"
                }

                await OrderModel.updateOne({ _id: order._id }, { $set: order })
                await OrderModel.updateOne({ _id: orders[i]._id }, { $set: orders })

                log(orders[i], order, avgExecutedPrice)
            }
        }
    }

    if (order.type == "buy") {
        let orders = await findSellers(order)

        for (var i = 0; i < orders.length; i++) {
            if (
                orders[i].quantity < orders[i].executedQuantity &&
                order.quantity < order.executedQuantity
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

                let avgExecutedPrice = (orders[i].price + order.price) / 2
                orders[i].avereageExecutedPrice = orders[i].avereageExecutedPrice != 0 ? (orders[i].avereageExecutedPrice + avgExecutedPrice) / 2 : avgExecutedPrice
                order.avereageExecutedPrice = order.avereageExecutedPrice != 0 ? (order.avereageExecutedPrice + avgExecutedPrice) / 2 : avgExecutedPrice
                if (orders[i].quantity == orders[i].executedQuantity) {
                    orders[i].status = "completed"
                }
                if (order.quantity == order.executedQuantity) {
                    order.status = "completed"
                }

                await OrderModel.updateOne({ _id: order._id }, { $set: order })
                await OrderModel.updateOne({ _id: orders[i]._id }, { $set: orders })

                log(order, orders[i], avgExecutedPrice)
            }
        }
    }

    return
}