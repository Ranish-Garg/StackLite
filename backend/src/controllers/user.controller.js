import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generaterefreshandaccesstoken = async (userid) => {
  const user = await User.findById(userid);

  let refreshtoken = await user.getrefreshtoken();
  let accesstoken = await user.getaccesstoken();

  user.refreshtoken = refreshtoken;
  await user.save({ validateBeforeSave: false });

  return { accesstoken, refreshtoken };
};

const registeruser = async (req, res) => {
  //username password lenge
  //validation
  //avatar ka kaam
  //cloudinary pe upload
  //refreshtoken or accesstoken bnaenge
  //refresh token bhi save krenge
  //create krdenge document
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(402).send("problem in receiving username and password");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Username already taken");
    }
    const avatar = req.file?.path;

    const avatarresponse = await uploadoncloudinary(avatar);

    const user = await User.create({
      username,
      password,
      avatar: avatarresponse.url || "",
    });

   const createdUser = await User.findById(user._id).select("-password -refreshtoken");

    if (!createdUser) {
      res.status(400).send("problem while registering user");
    }

   return res.status(201).json({
  message: "User registered successfully",
  user: createdUser,
});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });

  }
};

const loginuser = async (req,res) => {
  //credintials lenge
  //check krenge
  //validation
  //refresh token or access token denge


 try {
         const { username, password } = req.body;
       
         if (!username || !password) {
          return  res
             .status(400)
             .send("problem is receiving username or password in backend");
         }
       
         const user = await User.findOne({ username });
       
         const passcorrect = await user.ispasswordcorrect(password);
       
         if (!passcorrect) {
         return   res.status(400).send("something wrong with the password");
         }
       
         const { accesstoken, refreshtoken } = await generaterefreshandaccesstoken(user._id)

         const loggedinuser = await User.findOne({username}).select("-password")

         const options = {
                secure : true,
                httpOnly : true,
         }

         return res.status(200).cookie("accesstoken",accesstoken,options).cookie("refreshtoken",refreshtoken,options).json({"user": loggedinuser,
                "message" : "user logged in successfully",
         })


 } catch (error) {
     console.log(error.message)
     res.status(500).json({ error: error.message });   
 }
};



const logoutuser = async(req,res)=>
{
        //phle cookies se user nikalenge thorugh middleware
        // req.user me user aega 
        //database se refresh token hata denge 
        //cookie clear kr denge 
      try {
   const user = req.user;

  
    user.refreshtoken = undefined;

   
    await user.save({ validateBeforeSave: false });

    
    res.clearCookie("accesstoken", {
      httpOnly: true,
      secure: true,
      
    });

    res.clearCookie("refreshtoken", {
      httpOnly: true,
      secure: true,
      
    });

    return res.status(200).json({ message: "User logged out successfully" });   

      } catch (error) {
        console.log(error.message)
             res.status(500).json({ error: error.message });   

      }


}

const refershaccesstoken = async(req,res)=>
{
    //req se cookie lenge refresh token
    //match krenge database wale se 
    //same h to nya accesstoken bnaenge or cookie return kr denge 

    const cookierefreshtoken = req.cookie?.refreshtoken;

    if(!cookieaccesstoken)
    {
      res.status(400).send("unauthorised request")
    }

   try {
     const decodedtoken = jwt.verify(cookierefreshtoken,process.env.REFRESH_TOKEN_SECRET)
 
     const user =  await User.findById(decodedtoken._id);  
 
     if(!user)
     {
       res.status(400).send("invalid refresh token")
 
     }
 
     if(user.refreshtoken !== cookierefreshtoken)
     {
       res.status(400).send("Refresh token is expired or used")
     }

     const { newaccesstoken ,newrefreshtoken}= await generaterefreshandaccesstoken(user._id);
     
     const options = {
      secure: true,
      httpOnly : true,
     }


     res.status(200).cookie("accesstoken",newaccesstoken,options).cookie("refreshtoken",newrefreshtoken,options).send("accesstokens generated");
     
 
   } catch (error) {
    console.log(error.message)
      res.status(200).json({
        message: error.message,
      })
   }


}

const getcurrentuser = async(req,res)=>
{
  //req.user de denge
  if(!req.user)
  {
    return res.status(200).send("no user loggedin")
  }
  
  return res.status(200).json({
    user : req.user,
  message: "current user fetched"
})
}



export { registeruser, loginuser,logoutuser,refershaccesstoken,getcurrentuser };
