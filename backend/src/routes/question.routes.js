import { Router } from "express";
import {addquestion,numberofupvotes,upvote,downvote,increaseviews,questionfromid,getAllQuestions,searchQuestions} from "../controllers/question.controller.js"
import {verifyuser} from "../middlewares/auth.middleware.js"



const router = Router();

router.route("/addquestion").post(verifyuser,addquestion)
router.route("/upvotenumber/:questionid").post(numberofupvotes)
router.route("/getallquestions").post(getAllQuestions)
router.route("/searchquestion").post(searchQuestions)
router.route("/increaseview").post(increaseviews)



export default router;