import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";




const verifyuser =async(req,res,next)=>
{
    const encodedaccesstoken= req.cookies?.accesstoken;

    if(!encodedaccesstoken)
    {
        return res.status(400).send("problem in receiving token from cookie")
    }

      const decodedToken =  jwt.verify(encodedaccesstoken, process.env.ACCESS_TOKEN_SECRET)


    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if(!user)
    {
        return res.status(400).send("invalid token")
    }

    req.user = user;
    next();
}


export {verifyuser}