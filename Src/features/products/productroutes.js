import express from 'express';
import productcontroller from './productcontroller.js';

const ProductController=new productcontroller();
const ProductRouter=express.Router();

ProductRouter.post( "/addproduct",(req, res)=>{ ProductController.addProduct(req, res) });
ProductRouter.get("/getall",(req,res)=>{ ProductController.getAllProducts(req,res) });
ProductRouter.delete("/delete/:id",(req,res)=>{ProductController.deleteproduct(req,res)});
ProductRouter.get('/filter',(req,res)=>{ ProductController.filterProduct(req,res) });


export default ProductRouter;