import { Order, OrderModel } from "../models/Order";
import { matchBuyer } from "./matchBuyer";
import { matchSeller } from "./matchSeller";

export const trade = async (order: Order) => {
    console.log(`[info] received TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)
    console.log(`[info] finding TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)

    if (order.type == "sell") {
        let orders = await matchBuyer(order)
        console.log(`[info] found ${orders.length}`)
    }

    if (order.type == "buy") {
        let orders = matchSeller(order)
        console.log(`[info] found ${orders.length}`)
    }

}