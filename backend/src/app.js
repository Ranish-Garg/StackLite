import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                // Allow cookies/auth headers
}));


import userRouter from './routes/user.routes.js'
import questionRouter from "./routes/question.routes.js"
import answerRouter from "./routes/answer.route.js"





app.use("/api/v1/users",userRouter);
app.use("/api/v1/question",questionRouter)
app.use("/api/v1/answer",answerRouter)




export default app;