import express from 'express';
import { v1 } from './api/v1';
import { connect } from 'mongoose';
import bodyParser from 'body-parser'
import { OrderModel } from './app/models/Order';

const app = express();

const port = process.env.PORT || 8080

let mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/orders"

connect(mongoURI)
    .then(() => {
        console.log("[info] connected to database on", mongoURI)
    }).catch(() => {
        console.error("[error] unable to connect to database")
        process.exit(1)
    })


app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`[info] app listening on ${port}`)
});


app.use("/v1", v1)