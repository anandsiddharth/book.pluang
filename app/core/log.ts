import { Order } from "../models/order";

export const log = (buy: Order, sell: Order, quantity: number, price: number) => {
    console.log(`[log] ${buy._id} ${quantity} ${price} ${sell._id}`)
}