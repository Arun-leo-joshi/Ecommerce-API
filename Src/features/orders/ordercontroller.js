import orderrepository from "./orderrepository.js";

const OrderRepository=new orderrepository();

export default class ordercontroller{

    async placeOrder(req,res){
        try{
            const userId=req.userId;
            await OrderRepository.placeOrder(userId);
            res.status(201).send("order is placed")
        }catch(err){
            console.log(err);
            return res.status(400).send("Something went wrong");
         }
    }
}