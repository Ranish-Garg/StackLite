import mongoose from "mongoose"

const questionschema = new mongoose.Schema({
    questionby:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    title: {
        type : String,
        required: true,

    },
    details : {
        type : String,
        required : true,
    },
    code : {
        type : String,
        
    },
    tags: {
    type: [String], 
     required: true,
    },
    upvotes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
  
    }],
  downvotes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
    }],
    views:
    {
        type: Number,
        default: 0,
    }

},{timestamps: true,})

export const Question = mongoose.model("Question",questionschema);