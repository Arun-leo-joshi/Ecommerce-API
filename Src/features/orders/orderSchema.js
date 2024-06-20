import mongoose from 'mongoose';

const OrderSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    totalAmount:{type:Number,
        required:true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Ordermodel=mongoose.model("Orders",OrderSchema);
export default Ordermodel;