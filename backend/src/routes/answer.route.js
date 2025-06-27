import {Router} from "express"
import { uploadanswer } from "../controllers/answer.controller"
import { verifyuser } from "../middlewares/auth.middleware"


const router = Router()

router.route("/uploadanswer/:questionid").post(verifyuser,uploadanswer)


export default {router}