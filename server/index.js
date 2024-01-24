import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import baseRoutes from "./routes/base.js";
import missileRoutes from "./routes/missile.js";
import launchRoutes from "./routes/launch.js";
import statsRouter from "./routes/stats.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  }), 
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 });

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected");
});

db.on("error", (error) => {
  console.log(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/base", baseRoutes);
app.use("/missile", missileRoutes);
app.use("/launch", launchRoutes);
app.use("/stats", statsRouter);

//Setting up s3

app.get("*", (req, res)=>{
  res.send("Server is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
});