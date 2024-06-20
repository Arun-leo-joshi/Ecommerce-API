import { ApplicationError } from "../../error-handler/applicationError.js";
import Cartmodel from "./cartSchema.js";

export default class cartrepository {

    async add(productId, userId, quantity) {
        try {
            // find the document
            // either insert or update document
            await Cartmodel.updateOne({ productId, userId },

                {
                    $setOnInsert: { productId: productId, userId: userId },
                    $inc: { quantity: quantity }
                },

                { upsert: true })

        } catch (err) {
            console.log(err)
            throw new ApplicationError("something went wrong with database", 500);
        }
    }

    async get(userId) {
        try {
            return await Cartmodel.find({ userId }).exec();
        } catch (err) {
            console.log(err)
            throw new ApplicationError("something went wrong with database", 500);
        }
    }

    async delete(cartitemId, userId) {
        try {
            console.log(userId)
            const result = await Cartmodel.deleteOne({ _id:cartitemId, userId })
            return result.deletedCount > 0;
        } catch (err) {
            console.log(err)
            throw new ApplicationError("something went wrong with database", 500);
        }
    }
}