import { OrderModel } from "../app/models/order";
import { connect } from 'mongoose';

const assert = require("assert");

let mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/orders"




describe('orders', function () {

    it("should connect to mongo", async function () {
        await connect(mongoURI)
    })

    it("should create sample buy order", async function () {
        try {
            await OrderModel.create({
                user: 3,
                type: 'sell',
                quantity: 110,
                price: 245.10,
                symbol: 'BTC'
            });
        } catch (e) {
            console.log(e)
        }
    });


    it("should create sample sell order", async function () {
        await OrderModel.create({
            user: 1,
            type: 'sell',
            quantity: 80,
            price: 236.45,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {

        await OrderModel.create({
            user: 3,
            type: 'buy',
            quantity: 70,
            price: 239.10,
            symbol: 'BTC'
        });
    });
    it("should create sample sell order", async function () {

        await OrderModel.create({
            user: 1,
            type: 'sell',
            quantity: 220,
            price: 242.50,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {
        await OrderModel.create({
            user: 3,
            type: 'buy',
            quantity: 50,
            price: 239.50,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {
        await OrderModel.create({
            user: 3,
            type: 'buy',
            quantity: 10,
            price: 1001.10,
            symbol: 'ETH'
        });
    });
    it("should create sample sell order", async function () {
        await OrderModel.create({
            user: 3,

            type: 'sell',
            quantity: 20,
            price: 240.10,
            symbol: 'BTC'
        });
    });
    it("should create sample buy order", async function () {

        await OrderModel.create({
            user: 3,

            type: 'buy',
            quantity: 150,
            price: 242.70,
            symbol: 'BTC'
        });
    });



});
