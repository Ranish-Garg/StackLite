import mongoose from "mongoose"

const answerschema = new mongoose.Schema({
    answeredby : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    anstext : {
        type: String,
        required: true, 
    },
    toquestion : 
    {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Question",
    }
    
},{timestamps: true})

export const Answer = mongoose.model("Answer",answerschema);    