import { Order, OrderModel } from "../app/models/order";
import { connect } from 'mongoose';
import { trade } from "../app/core/trade";

const assert = require("assert");

let mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/orders"




describe('orders', function () {



    it("should connect to mongo", async function () {
        await connect(mongoURI)
    })


    it("should create sample buy order", async function () {

        await OrderModel.create({
            orderId: 101,
            user: 3,
            type: 'sell',
            quantity: 110,
            price: 245.10,
            symbol: 'BTC'
        });

    });


    it("should create sample sell order", async function () {
        await OrderModel.create({
            orderId: 202,
            user: 1,
            type: 'sell',
            quantity: 80,
            price: 236.45,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {

        await OrderModel.create({
            orderId: 303,
            user: 3,
            type: 'buy',
            quantity: 70,
            price: 239.10,
            symbol: 'BTC'
        });
    });
    it("should create sample sell order", async function () {

        await OrderModel.create({
            orderId: 501,
            user: 1,
            type: 'sell',
            quantity: 220,
            price: 242.50,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {
        await OrderModel.create({
            orderId: 602,
            user: 3,
            type: 'buy',
            quantity: 50,
            price: 239.50,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {
        await OrderModel.create({
            orderId: 701,
            user: 3,
            type: 'buy',
            quantity: 10,
            price: 1001.10,
            symbol: 'ETH'
        });
    });
    it("should create sample sell order", async function () {
        await OrderModel.create({
            orderId: 801,
            user: 3,
            type: 'sell',
            quantity: 20,
            price: 240.10,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {

        await OrderModel.create({
            orderId: 901,
            user: 3,
            type: 'buy',
            quantity: 150,
            price: 242.70,
            symbol: 'BTC'
        });
    });

    it("should execute the order completely", async function () {
        let order = await OrderModel.findOne({ orderId: 202 });
        assert(order?.quantity == order?.executedQuantity)
    });

});
