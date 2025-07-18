import { Router } from "express";
import {addquestion,numberofupvotes,upvote,downvote,increaseviews,questionfromid,getAllQuestions,searchQuestions,getallanswerstoquestion} from "../controllers/question.controller.js"
import {verifyuser} from "../middlewares/auth.middleware.js"



const router = Router();

router.route("/addquestion").post(verifyuser,addquestion)
router.route("/upvotenumber/:questionid").post(numberofupvotes)
router.route("/getallquestions").post(getAllQuestions)
router.route("/searchquestion").post(searchQuestions)
router.route("/increaseview").post(increaseviews)
router.route("/questionfromid/:questionid").post(questionfromid)
router.route("/getallanswerstoquestion/:questionid").post(getallanswerstoquestion)



export default router;