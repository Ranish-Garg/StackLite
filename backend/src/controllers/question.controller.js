import mongoose from "mongoose"
import {Question} from "../models/question.model.js"
import { Answer } from "../models/answer.model.js";


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


const numberofupvotes = async (req, res) => {
  try {
    const questionid = req.params.questionid;

    const question = await Question.findById(questionid);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const number = question.upvotes.length;

    return res.status(200).send({ upvotes: number });
  } catch (error) {
    console.error("Error getting upvotes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const upvote = async (req, res) => {
  try {
    const questionid = req.params.questionid;
    const question = await Question.findById(questionid);
    const userid = req.user._id;

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const hasUpvoted = question.upvotes.some(id => id.toString() === userid.toString());
    const hasDownvoted = question.downvotes.some(id => id.toString() === userid.toString());

    if (hasUpvoted) {
       question.upvotes.pull(userid);
      await question.save();
      return res.status(200).json({ message: "Upvote removed", question });
    }

    if (hasDownvoted) {
      question.downvotes.pull(userid); 
    }

    question.upvotes.push(userid); 
    await question.save(); 

    return res.status(200).json({ message: "Upvote registered", question });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const downvote = async (req, res) => {
  try {
    const questionid = req.params.questionid;
    const question = await Question.findById(questionid);
    const userid = req.user._id;

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    
    const hasDownvoted = question.downvotes.some(
      id => id.toString() === userid.toString()
    );
    const hasUpvoted = question.upvotes.some(
      id => id.toString() === userid.toString()
    );

    if (hasDownvoted) {
      question.downvotes.pull(userid);
      await question.save();
      return res.status(200).json({ message: "Downvote removed", question });
    }

    
    if (hasUpvoted) {
      question.upvotes.pull(userid);
    }

  
    question.downvotes.push(userid);
    await question.save();

    return res.status(200).json({
      message: "Downvote registered",
      question,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const increaseviews = async(req,res)=>
{
    try {
        const questionid = req.params.questionid;
    
        const question = await Question.findById(questionid)
    
          if (!question) {
          return res.status(404).json({ message: "Question not found" });
        }
    
        question.views+=1;
    await question.save({ validateBeforeSave: false });
    
    return res.status(200).json({ question });
    } catch (error) {
         return res.status(500).json({ message: err.message });
    }

}

const questionfromid =  async(req,res)=>
{
 try {
   const quesid = req.params.questionid;
 
   const question = await Question.findById(quesid).populate("questionby","username");
 
   if(!question)
   {
     return res.status(400).send("question not found")
   }
 
   return res.status(200).json(question)
 } catch (error) {

  console.log(error.message)
  return res.status(402).json({message : error.message})
 }
}

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 }) 
      .populate("questionby", "username");  

    return res.status(200).json(questions);  
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchQuestions = async (req, res) => {
  try {
    const { query } = req.query;  // URL will look like /search?query=react

    const regex = new RegExp(query, "i");  // case-insensitive regex pattern

    const questions = await Question.find({
      $or: [
        { title: regex },    // search in title
        { tags: regex },     // or tags
        { details: regex }   // or details
      ]
    });

    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getallanswerstoquestion = async(req,res)=>
{
  //params se questionid nikalenge 
  // answers ke model se query marenge questionid se toquestion
  const questionid = req.params.questionid;

try {
  const answers = await Answer.find({ toquestion: questionid }).populate("answeredby", "username"); // optional populate
  res.status(200).json(answers);
} catch (err) {
  console.error("Failed to get answers", err);
  res.status(500).json({ message: "Error fetching answers" });
}

}


export {addquestion,numberofupvotes,upvote,downvote,increaseviews,questionfromid,getAllQuestions,searchQuestions,getallanswerstoquestion}