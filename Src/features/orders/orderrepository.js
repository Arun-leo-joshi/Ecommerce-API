import mongoose from 'mongoose';
import { ApplicationError } from '../../error-handler/applicationError.js';
import Cartmodel from "../cart/cartSchema.js";
import Productmodel from "../products/productSchema.js";
import Ordermodel from "./orderSchema.js";

export default class orderrepository {
    async placeOrder(userId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // 1.get cartitem and calculate totalAmount
            const items = await this.totalAmount(userId, session);
            const finalTotalAmount = await items.reduce((acc, item) => acc + item.totalAmount, 0);

            console.log("finalTotalAmount ", finalTotalAmount)

            // 2.Create order record
            const newOrder = await Ordermodel.create({
                userId: userId,
                totalAmount: finalTotalAmount,
                timestamp: new Date()
            });


            // reduce the available stock in products
            for (let item of items) {
                await Productmodel.updateOne({ _id: item.productId },
                    { $inc: { stock: -item.quantity } },
                    { session }
                );
            }

            // 4.clear the cart items
            console.log("userid ",userId)
            await Cartmodel.deleteMany({ userId: userId },
                { session }
            );

            await session.commitTransaction();
            session.endSession();
            return newOrder;

        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }


    async totalAmount(userId, session) {
        const items = await Cartmodel.aggregate([
            // 1. Get cart items of user
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            // 2. Get the products from product collection
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            // 3. Unwind the product info
            {
                $unwind: '$productInfo'
            },
            // 4. Calculate total amount of cart and add totalAmount field to items
            {
                $addFields: { 'totalAmount': { $multiply: ['$productInfo.price', '$quantity'] } }
            }
        ]).session(session).exec();

        return items;
    }
}

