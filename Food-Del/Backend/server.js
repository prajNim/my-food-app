import express from "express"
import cors from "cors"
import { connectDB } from "./config/DB.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/UserRoute.js"
import  'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import path from 'path'
//app config
const app = express()
const port = process.env.PORT || 4013

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//API endpoint
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.get("/",(req, res) =>{
res.send("API Working")


})
app.use(express.static("../frontend/dist"));
app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
});
const url = process.env.Azure_URL

app.listen(port,()=>{
    console.log(`server started on ${url}:${port}`)
})

//mongodb+srv://prajaktanimbalkar04:<password>@cluster0.ryarmxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
