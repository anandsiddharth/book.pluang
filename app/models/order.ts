import { Schema, model, connect } from 'mongoose';
import { trade } from '../core/trade';

export interface Order {
    user: number,
    type: 'buy' | 'sell',
    symbol: string
    price: number
    quantity: number
    status: 'pending' | 'completed'
}

const schema = new Schema<Order>({
    user: { type: Number, required: true },
    type: { type: String, enum: ['buy', 'sell'], default: 'buy', required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    status: { type: String, required: true, default: 'pending', enum: ['pending', 'completed'] }
}, { timestamps: true })

schema.post('save', function () {
    trade(this);
});

export const OrderModel = model<Order>('Order', schema);