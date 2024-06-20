import { ApplicationError } from "../../error-handler/applicationError.js";
import Productmodel from "./productSchema.js";

export default class productRepository {

    async getAll() {
        try {
            return Productmodel.find();
        } catch (err) {
            console.log(err)
            throw new ApplicationError("something went wrong with database", 500);
        }
    }

    async add(newProduct) {
        try {
            return await Productmodel.create(newProduct);
            
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500);
        }
    }

    async deleteproduct(productId){
        try {
            const result= await Productmodel.deleteOne({_id:productId})
            return result.deletedCount>0;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500);
        }
    }

    async filter(minPrice,maxPrice, category){
        try{
            let filterExpression={};
            if(minPrice){
                filterExpression.price={$gte:parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category=category;
            }
            return await Productmodel.find(filterExpression).exec();
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    
}