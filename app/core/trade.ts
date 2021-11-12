import { Order, OrderModel } from "../models/Order";

export const trade = (order: Order) => {
    console.log(`[info] received TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)
    console.log(`[info] finding TYPE:${order.type} SYM:${order.symbol} QTY:${order.quantity} PRICE:${order.price}`)


    OrderModel.find()


}