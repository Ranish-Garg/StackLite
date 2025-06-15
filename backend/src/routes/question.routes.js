import { Router } from "express";
import {addquestion} from "../controllers/question.controller.js"
import {verifyuser} from "../middlewares/auth.middleware.js"



const router = Router();

router.route("/addquestion").post(verifyuser,addquestion)



export default router;