import { Schema, model, connect } from 'mongoose';
import { trade } from '../core/trade';

export interface Order {
    _id: string
    user: number,
    type: 'buy' | 'sell',
    symbol: string
    price: number
    avereageExecutedPrice: number
    quantity: number
    executedQuantity: number
    status: 'pending' | 'completed'

    createdAt: Date
    updatedAt: Date
}

const schema = new Schema<Order>({
    user: { type: Number, required: true },
    type: { type: String, enum: ['buy', 'sell'], default: 'buy', required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    avereageExecutedPrice: { type: Number, default: 0 },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    executedQuantity: { type: Number, default: 0 },
    status: { type: String, required: true, default: 'pending', enum: ['pending', 'completed'] }
}, { timestamps: true })

schema.post('save', async function () {
    await trade(this);
    return this;
});

export const OrderModel = model<Order>('Order', schema);