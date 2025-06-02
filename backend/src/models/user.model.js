import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        index: true

    },
    password:
    {
        type: String,
        required : true,
    },
    avatar:
    {
        type : String,
        
    },
    refreshtoken: 
    {
        type: String,

    }
},{timestamps: true})



Userschema.pre('save', async function(next) {

    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password, 10)
  
  next();
});

Userschema.methods.getaccesstoken = ()=>
{
    jwt.sign(
        {
            _id: this._id,
            username : this.username,
        
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

Userschema.methods.getrefreshtoken = ()=>
{
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPIRY,
        }
    )
}




export const User = mongoose.model("User",Userschema);