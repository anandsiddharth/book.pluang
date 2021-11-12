import { Order, OrderModel } from "../models/Order";
import { findBuyers } from "./findBuyers";
import { findSellers } from "./findSellers";

export const trade = async (order: Order) => {
    console.log(`[info] received TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)
    console.log(`[info] finding TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)

    if (order.type == "sell") {
        let orders = await findBuyers(order)
    }

    if (order.type == "buy") {
        let orders = await findSellers(order)
    }

    return
}