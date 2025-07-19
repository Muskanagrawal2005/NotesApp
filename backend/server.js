import express from 'express'
import "dotenv/config"
import cors from "cors"
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import noteRouter from './routes/noteRoutes.js'

const app=express()

await connectDB()

app.use(cors({
  origin: "http://localhost:5173", // or your frontend port
  credentials: true
}));
app.use(express.json());

app.get('/',(req,res)=>res.send("server is running"))
app.use('/api/user',userRouter)
app.use('/api',noteRouter)

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`server running on ${PORT}`))

