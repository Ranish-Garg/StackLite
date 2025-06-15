import mongoose from "mongoose"
import Question from "../models/question.model.js"


const addquestion = async(req,res)=>
{
    //current user lenge auth middleware se 
    //phle title,description,code,tagsarray,

    const currentuserid = req.user?._id;

    const {title , details, code , tags} = req.body;

    if(!title || !details )
    {
       return  res.status(400).send("title and details are necessary ");
    }
    if(tags.length == 0)
    {
        return res.status(400).send("there must be atleast one tag");
    }

    const question = await Question.create({
        questionby: currentuserid,
        title,
        details,
        code: code || "",
        tags,
    })

    return res.status(200).json({question,message : "Question uploaded"})
}




export {addquestion}