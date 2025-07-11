import { Router } from "express";
import {registeruser,loginuser,logoutuser,refershaccesstoken,getcurrentuser,addavatar} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyuser} from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/register").post(registeruser);
router.route("/addavatar").post(upload.single('avatar'),verifyuser,addavatar)
router.route("/login").post(loginuser);


router.route("/logout").post(verifyuser,logoutuser)
router.route("/refreshaccesstoken").post(refershaccesstoken)
router.route("/getcurrentuser").post(verifyuser,getcurrentuser)




export default router;