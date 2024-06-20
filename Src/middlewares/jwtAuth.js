import jwt from 'jsonwebtoken';

const jwtAuth=(req,res,next)=>{
// 1. read the token
const token=req.headers['authorization'];

// 2. if there is no token, return error

if(!token){
    return res.status(401).send('Unauthorized');
}

// 3. check if token is valid

try{
   const payload= jwt.verify(
    token,"t9ACgLHSszyj6cVBDQCL9sYQO41rZQIf"
    );
    req.userId = payload.userId;
   
} 
catch(err){
    return res.status(401).send('Unauthorized');
}

// 4. call next middleware
next();

}

export default jwtAuth;