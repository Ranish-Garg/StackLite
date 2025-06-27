import { Router } from "express";
import {addquestion,numberofupvotes} from "../controllers/question.controller.js"
import {verifyuser} from "../middlewares/auth.middleware.js"



const router = Router();

router.route("/addquestion").post(verifyuser,addquestion)
router.route("/upvotenumber/:questionid").post(numberofupvotes)



export default router;