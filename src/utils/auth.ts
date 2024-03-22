// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from 'express';
const secretKey="ishit"
export const createJwtToken=(user: {
    id: number;
    firstName: string;
    LastName: string;
    email: string;
    password: string;
})=>{
    return jwt.sign(user,secretKey,{expiresIn:"24h"})
}

export const verifyToken=(req: Request,res: Response,next: NextFunction)=>{
    let token=req.cookies.token;
    let decode=jwt.verify(token,secretKey);
    console.log(decode);
    if(decode){
        req.user=decode;
       return next();
    }
    res.send("token invalid");
}