import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./route/authRoute.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.get("/test", (req, res) => {
  res.send("Hello from test route");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASEE CONNECTION SUCCESSFUL");
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED", error);
  }
};
connectDB();
app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVER IS LISTENING AT PORT ${process.env.PORT || 3000}`);
});
