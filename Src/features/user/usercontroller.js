import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userrepository from './userrepository.js';

const UserRepository = new userrepository();

export default class usercontroller {

    async signUp(req, res) {
        try {
            const { name, email, password, type } = req.body;

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = { name, email, password: hashedPassword, type };
            const addeduser = await UserRepository.signUp(user)
            res.status(201).send(addeduser);
        } catch (err) {
            console.log(err)
            return res.status(400).send("something went wrong");
        }
    }

    async signIn(req, res) {
        try {
            const user = await UserRepository.findByemail(req.body.email);

            if (!user) {
                return res.status(400).send('Incorrect Credentials');
            } else {
                //    compare password with hasshedpassword
                const result = bcrypt.compare(req.body.password, user.password)
                if (result) {
                    // create jwt token
                    const token = jwt.sign({ userId: user._id, email: user.email },
                        process.env.JWT_SECRETKEY,
                        { expiresIn: '1h', }
                    );

                    //  send token 
                    return res.status(200).send(token);
                } else {
                    return res.status(400).send("Incorrect Credentials");
                }
            }
        } catch (err) {
            console.log(err)
            return res.status(400).send("something went wrong");
        }
    }

    async resetPassword(req,res){
        const {newpassword}=req.body;
        const hashedpassword=bcrypt.hash(newpassword,12)
        const userId=req.userId
        try{
            await UserRepository.resetPassword(userId,hashedpassword)
            res.status(200).send("password is updated succesfully")
        }catch(err){
            console.log(err);
            return res.status(400).send("something went wrong");
        }
    }
}