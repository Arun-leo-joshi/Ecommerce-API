import productRepository from "./productrepository.js";

const ProductRepository = new productRepository();

export default class productcontroller {

    async addProduct(req, res) {
        try {
            const { pName, description, price, stock, categoryid } = req.body;
            const newProduct = { pName, description, price, stock, categoryid };

            const createdProduct = await ProductRepository.add(newProduct);
            res.status(201).send(createdProduct);
        } catch (err) {
            console.log(err);
            return res.status(400).send("Something went wrong");
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await ProductRepository.getAll();
            res.status(200).send(products);
        } catch (err) {
            console.log(err)
            return res.status(400).send("something went wrong");
        }
    }

    async deleteproduct(req, res) {

        try {
            const productId = req.params.id;

            const deleted=await ProductRepository.deleteproduct(productId);

            if(!deleted){
                res.status(404).send("product not found");
            }else{
                res.status(200).send("succesfully deleted");
            }
            
        } catch (err) {
            console.log(err)
            return res.status(400).send("something went wrong");
        }
    }

    async filterProduct(req,res){
        try{
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;

        const result=await ProductRepository.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}