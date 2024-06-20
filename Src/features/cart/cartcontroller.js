import cartrepository from "./cartrepository.js";

const CartRepository = new cartrepository();

export default class cartcontroller {

    async add(req, res) {

        try {
            const { productId, quantity } = req.body;
            const userId = req.userId;

            await CartRepository.add(productId, userId, quantity);
            res.status(201).send('cart is updated');
        } catch (err) {
            console.log(err)
            return res.status(400).send("something went wrong");
        }
    }

    async get(req, res) {
        try {
            const userId = req.userId;
            const items = await CartRepository.get(userId);
            return res.status(200).send(items);
        } catch (err) {
            console.log(err)
            return res.status(400).send("something went wrong");
        }
    }

    async delete(req, res) {

        try {
            const userId = req.userId;
            const cartitemId = req.params.id;

            const isDeleted = await CartRepository.delete(cartitemId, userId);
            if (!isDeleted) {
                return res.status(404).send("item not found")
            }
            return res.status(200).send('cart item is removed')
        } catch (err) {
            console.log(err)
            return res.status(400).send("something went wrong");
        }

    }
}