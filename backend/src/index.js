import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
dotenv.config({ path: './.env' })
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { redis } from './config/redis.js'

const app = express()

const port=process.env.PORT || 4000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))                      
app.use(express.urlencoded({limit:"16kb", extended:true}))    
app.use(express.static("public"))                     
app.use(cookieParser()) 

import authRouter from './routers/auth.router.js'
app.use('/api/auth', authRouter)

import userRouter from './routers/user.router.js'
app.use('/api/user', userRouter)

import pdfRouter from './routers/pdf.router.js'
app.use('/api/pdf', pdfRouter)

const startServer = async () => {
  try {
    // MongoDB connect
    await connectDb();

    // Redis test
    await redis.set("test", "Redis Connected");
    const value = await redis.get("test");
    console.log("Redis Test:", value);

    // Start Express server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server start error:", error);
    process.exit(1);
  }
};

startServer();