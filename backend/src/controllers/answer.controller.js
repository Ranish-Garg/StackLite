import mongoose from "mongoose";
import { Answer } from "../models/answer.model.js";

const uploadanswer = async(req,res)=>
{
    // body se anstext nikalenge 
    //question id nikalenge url se 
    // user id same auth middleware se 

    const {anstext} = req.body;

    if(!anstext)
    {
        return res.status(401).send("answer is required");
    }

    const questionid = req.params.questionid;

    if(!questionid)
    {
        return res.status(401).send("not able to get question id from url");

    }

    const userid = await req.user._id;

    if(!userid)
    {
        return res.status(401).send("problem in receiving userid");

    }

    const answer =  await Answer.create({
        answeredby: userid,
        anstext,
        toquestion: questionid,
    })
    
    const createdans = Answer.findById(answer._id)

    if(!createdans)
    {
         return res.status(401).send("problem in uploading answer");
    }

    return res.status(200).json({
        createdans,
        message : "answer uploaded successfully"
    })
 

}

const numberofanswerstoques = async (req, res) => {
  try {
    const quesid = req.params.questionid;

   
    const answersnumber = await Answer.countDocuments({ toquestion: quesid });

    return res.status(200).json({ count: answersnumber });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {uploadanswer,numberofanswerstoques}