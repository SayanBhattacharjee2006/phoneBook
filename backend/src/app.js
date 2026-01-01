import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// router imports
import authRouter from "./routes/auth.route.js"
import contactRouter from "./routes/contact.route.js"
import phoneRouter from "./routes/phone.route.js"
import addressRouter from "./routes/address.route.js"
import emailRouter from "./routes/email.route.js"

const app = express();

// middlewares 
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// routes 
app.get("/",(req,res)=>{
    res.send("Contact book api running🚀")
})

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/contact",contactRouter);
app.use("/api/v1/phone",phoneRouter);
app.use("/api/v1/address",addressRouter);
app.use("/api/v1/email",emailRouter);


app.use((req,res) => {
    res.status(404).json({
        success:false,
        message:"Route not found"
    })
})

export default app