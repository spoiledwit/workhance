import EmployerModel from "../models/Employer.js";
import AuthModel from "../models/Auth.js";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const checkDomain = (website, email) => {
  const websiteDomain = website.split("/")[2];
  const emailDomain = email.split("@")[1];
  return websiteDomain === emailDomain;
};

export const createEmployer = async (req, res) => {
  try {
    const userId = req.userId;
    const { companyName, businessEmail, companyWebsite } =
      req.body;
    if (!checkDomain(companyWebsite, businessEmail)) {
      return res
        .status(400)
        .json({ message: "Company website and business email do not match" });
    }
    const verificationToken = uuidv4();
    const newEmployer = new EmployerModel({
      userId,
      companyName,
      businessEmail,
      companyWebsite,
      verificationToken,
      tokenExpiration: Date.now() + 3600000, // 1 hour
    });
    await newEmployer.save();
    const updatedUser = await AuthModel.findByIdAndUpdate(userId, {
      employerId: newEmployer._id,
    });
    await sendEmail({
      email: businessEmail,
      subject: "Welcome to Workhance",
      text: `Hello ${updatedUser.name},\n\n
            Welcome to Workhance. We have received your employer registration request.
            Please verify your email address by clicking on the link below.\n\n
            ${process.env.SERVER_URL}/verify-email/${updatedUser._id}?token=${verificationToken}\n\n
            The link is valid for 1 hour.\n\n
            Thank you,\n
            Workhance Team
            `,
    });
    res.status(201).json({ message: "Employer created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const userId = req.userId;
    const employer = await EmployerModel.findOne({ userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    const user = await AuthModel.findById(userId);
    const { businessEmail } = employer;
    const verificationToken = uuidv4();
    await EmployerModel.findByIdAndUpdate(employer._id, {
      verificationToken,
      tokenExpiration: Date.now() + 3600000, // 1 hour
    });
    await sendEmail({
      email: businessEmail,
      subject: "Welcome to Workhance",
      text: `Hello ${user.name},\n
            Welcome to Workhance. We have received your employer registration request.
            Please verify your email address by clicking on the link below.\n
            ${process.env.SERVER_URL}/verify-email/${userId}?token=${verificationToken}\n
            The link is valid for 1 hour.\n
            Thank you,\n
            Workhance Team
            `,
    });
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};