import express from 'express';
import ordercontroller from './ordercontroller.js';

const OrderRouter=express.Router();

const OrderController=new ordercontroller();

OrderRouter.post("/placeorder",(req,res)=>{OrderController.placeOrder(req,res)});


export default OrderRouter;