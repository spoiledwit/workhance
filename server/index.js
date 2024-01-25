import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import fileupload from "express-fileupload";

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
app.use(
  fileupload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
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
app.use("/posts", postRoutes);


//Setting up s3

app.get("/", (req, res)=>{
  res.send("Server is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
});