import { Router } from "express";
import {registeruser,loginuser,logoutuser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyuser} from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/register").post(upload.single('avatar'),registeruser);
router.route("/login").post(loginuser);


router.route("/logout").post(verifyuser,logoutuser)




export default router;