# book.pluang

#### Development env:- <br />

OS: Mac OS 12.0.1 <br />
Node: v14.15.4 <br />
Editor: VS Code <br />

### steps to run locally

1. Clone this repository
2. Run `npm install` to install all the dependencies
3. Run `npm run test` to run all tests.
4. Run `npm run dev` to start the server in development mode

### Api end point

#### Create order

`POST /v1/orders`

**Request Headers**
`"user": <userId>`

**Request Body**
`{ orderId: 303, user: 3, type: 'buy', quantity: 70, price: 239.10, symbol: 'BTC' }`

#### Get orders

`GET /v1/orders`

**Request Headers**
`"user": <userId>`
