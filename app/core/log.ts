import { Order } from "../models/order";

export const log = (buy: Order, sell: Order, quantity: number, price: number) => {
    console.log(`[log] #${sell.orderId} ${quantity} ${price} #${buy.orderId}`)
}