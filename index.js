import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";

// Routers
import userRouter from "./routers/userRouter.js";

import bookingRouter from "./routers/bookingRouter.js";

// Middleware
import authenticate from "./middlewares/authenticate.js";

dotenv.config();

// DNS Fix for MongoDB Atlas
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ===============================
// Public Routes (No Token Needed)
// ===============================
app.use("/api/users", userRouter);

// ===============================
// Protected Routes (Token Needed)
// ===============================
app.use(authenticate);


app.use("/api/bookings", bookingRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});