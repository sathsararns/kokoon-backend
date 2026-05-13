import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import jwt from "jsonwebtoken"
import authenticate from "./middlewares/authenticate.js"
import productRouter from "./routers/productRouter.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);


const mongodbURI = process.env.MONGO_URI 

mongoose.connect(mongodbURI).then(() => {
  console.log('Connected to MongoDB')
    }
)

const app = express();

app.use(cors());

app.use(express.json());

app.use(authenticate);

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)



app.listen(3000, ()=> {
  console.log("server start successfully");
});

 



