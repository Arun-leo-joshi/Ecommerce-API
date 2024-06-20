import express from 'express';
import cartcontroller from './cartcontroller.js';

const CartRouter=express.Router();
const CartController=new cartcontroller();

CartRouter.post("/addtocart", (req,res)=>{ CartController.add(req,res) });
CartRouter.get("/getcart",(req,res)=>{ CartController.get(req,res)});
CartRouter.delete("/deletecart/:id",(req,res)=>{CartController.delete(req,res)})
export default CartRouter;