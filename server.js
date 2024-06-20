import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { connectUsingMongoose } from './Src/config/mongoose.js';
import { ApplicationError } from './Src/error-handler/applicationError.js';
import CartRouter from './Src/features/cart/cartroutes.js';
import OrderRouter from './Src/features/orders/orderroutes.js';
import ProductRouter from './Src/features/products/productroutes.js';
import UserRouter from './Src/features/user/userroutes.js';
import jwtAuth from './Src/middlewares/jwtAuth.js';


const server= express();

// CORS policy Configuration
var corsOptions={
    origin:'http://localhost:5500',
    allowedHeaders:'*'
}

server.use(cors(corsOptions));

// parsing data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json())

server.get("/", (req,res)=>{
    res.send('Welcome to Ecommerce API')
})


// Handling routes here
server.use("/users",UserRouter);
server.use("/products",jwtAuth,ProductRouter);
server.use("/cart",jwtAuth,CartRouter);
server.use("/order",jwtAuth,OrderRouter);


// Handling Application Errors
server.use((err,req,res,next)=>{
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message)
    }
    res.status(500).send("Something went wrong, please try later")
})

// middleware to handle 404 requests
server.use((req,res)=>{
    res.status(404).send("API not found")
})

server.listen(3200, ()=>{
    console.log('server is running at port 3200')
    connectUsingMongoose();
});