import Usermodel from './userSchema.js';


export default class userrepository {
    async signUp(user) {
        try {
            return await Usermodel.create(user);
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500)
        }
    }

    async resetPassword(userId,hashedpassword){
        try{
            let user=await Usermodel.findById(userId);
            if(user){
            user.password=hashedpassword;
            user.save();
            }else{
                throw new Error("no such user found")
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500);
        }
       }

    async findByemail(email){
        try{
            return await Usermodel.findOne({email});
        } catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong with database", 500);
        } 
    }
}