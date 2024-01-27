import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import EmployerModel from "./models/Employer.js";
import { pdfUploader } from "./utils/Uploader.js";
import jobRoutes from "./routes/jobRoutes.js";
import fileupload from "express-fileupload";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
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
app.use("/search", searchRoutes);
app.use("/employer", employerRoutes);
app.use("/job", jobRoutes);
app.use("/application", applicationRoutes);
app.use("/upload", async (req, res) => {
  try {
    const file = req.files.file;
    const url = await pdfUploader(file);
    res.status(200).json({ url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//Verification
app.get("/verify-email/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { token } = req.query;
    const employer = await EmployerModel.findOne({ userId });

    if (
      !employer ||
      employer.verificationToken !== token ||
      employer.tokenExpiration < Date.now()
    ) {
      const failureUrl = `${process.env.CLIENT_URL}/?verification-error=Invalid token or token expired`;
      return res.redirect(failureUrl);
    }

    employer.isVerified = true;
    employer.verificationToken = undefined; // Clear the token
    employer.tokenExpiration = undefined; // Clear the expiry time
    await employer.save();

    const successUrl = `${process.env.CLIENT_URL}/post-job?verification-success`;
    res.redirect(successUrl);
  } catch (error) {
    console.log(error);
    const errorUrl = `${process.env.CLIENT_URL}/post-job?verification-error=${error.message}`;
    res.redirect(errorUrl);
  }
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
