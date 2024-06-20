import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String,
        required:true
     },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['customer', 'seller', 'admin']
    }
});

const Usermodel = mongoose.model("Users", userSchema);
export default Usermodel;