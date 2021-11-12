import { Order } from "../models/order";
import fs from 'fs'
export const log = (buy: Order, sell: Order, quantity: number, price: number) => {
    console.log(`[log] #${sell.orderId} ${quantity} ${price} #${buy.orderId}`)


    let fileName = `${buy.createdAt.getDate()}-${buy.createdAt.getMonth()}-${buy.createdAt.getFullYear()}`


    fs.appendFileSync(`logs/` + fileName, `#${sell.orderId} ${quantity} ${price} #${buy.orderId}\n`);

}