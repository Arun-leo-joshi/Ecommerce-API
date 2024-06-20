import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        enum:["electronics","fashion","furniture"] //for now i am taking 3 category we can add more later
    },
    description: {
        type: String,
    }
});

const Categorymodel = mongoose.model('Category', categorySchema);

export default Categorymodel;