import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./route/authRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./route/messageRoute.js";
import cors from "cors";
import { app, server, io } from "./lib/Socket.js";
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api", messageRoute);

//SERVER AND DATABASECONNECTION
async function connectToServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASEE CONNECTION SUCCESSFUL");
    server.listen(process.env.PORT || 3000, () => {
      console.log(`SERVER IS LISTENING AT PORT ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR PLEASE TRY AGAIN", error);
  }
}
connectToServer();
