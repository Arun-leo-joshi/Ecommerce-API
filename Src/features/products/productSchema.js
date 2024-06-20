import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    
    pName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
});

const Productmodel = mongoose.model('Product', productSchema);

export default Productmodel;