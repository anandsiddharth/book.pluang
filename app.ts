import express from 'express';
import { v1 } from './api/v1';

const app = express();

const port = process.env.PORT || 8080


app.listen(port, () => {
    console.log(`App listening on ${port}`)
});


app.use("/v1", v1)