import {Router} from "express"
import { uploadanswer } from "../controllers/answer.controller.js"
import { verifyuser } from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/uploadanswer/:questionid").post(verifyuser,uploadanswer)


export default router