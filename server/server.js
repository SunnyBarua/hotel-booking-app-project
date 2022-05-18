import cors from 'cors'
import dotenv from "dotenv"
import express from "express"
import connectDB from './config/db.js'
import { errorMiddleware, notFound } from "./middlewares/error.js"
import { requireSignIn } from './middlewares/requireSignIn.js'
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import hotelRoutes from "./routes/hotelRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import stripeRoutes from "./routes/stripeRoutes.js"

dotenv.config()
connectDB()
const app=express()


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("API is Running!!!")
})


app.use("/api/user",authRoutes)
app.use("/api/hotel",hotelRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/stripe",requireSignIn ,stripeRoutes)
app.use("/api/admin",adminRoutes)


app.all("*",notFound)
app.use(errorMiddleware)

const PORT=process.env.PORT || 5500
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})