import express from 'express';
import jwtAuth from '../../middlewares/jwtAuth.js';
import usercontroller from './usercontroller.js';

const UserRouter=express.Router();
const UserController=new usercontroller();

UserRouter.post('/signup',(req,res)=>{ UserController.signUp(req,res) });
UserRouter.post('/signin',(req,res)=>{ UserController.signIn(req,res) });
UserRouter.put('/resetpassword',jwtAuth,(req,res)=>{UserController.resetPassword(req,res)});

export default UserRouter;