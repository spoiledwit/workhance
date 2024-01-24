import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/Auth.js";
import dotenv from "dotenv";
// import sendEmail from "../utils/sendEmail.js";
import nodemailer from "nodemailer";
dotenv.config();

// Register
export const register = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;
        let approved = false;

        // Check if the user exists
        const users = await AuthModel.find()

        if (users.length === 0 && role !== "Army Chief") {
            role = "Army Chief"
            approved = true
        }

        console.log(users.length)
        console.log(role)

        const oldUser = await AuthModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User already exists");
        }

        // Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await AuthModel.create({
            name,
            email,
            hashedPassword: encryptedPassword,
            role,
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "tbcgulfmarketing@gmail.com",
              pass: "gyqj dwxp nrmo qobv",
            },
          });
      
          const mailOptions = {
            from: "tbcgulfmarketing@gmail.com",
            to: email,
            subject: "Verify your email address",
            text: `
            Hi ${name},
            Thank you for registering on our website.
            Please click on the link below to verify your email address.
            ${process.env.BASE_URI}/auth/verify/${user._id}
            `,
          };
          await transporter.sendMail(mailOptions);

        // Create token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.status(201).json({ user, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await AuthModel.findOne({ email });

        if (!user) {
            return res.status(404).send("User doesn't exist");
        }

        // Validate password
        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordCorrect) {
            return res.status(400).send("Invalid credentials");
        }

        // Create token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await AuthModel.findById(req.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const verify = async (req, res) => {
    try {
        const user = await AuthModel.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User doesn't exist");
        }

        user.verify = true;

        await user.save();

        res.redirect(process.env.FRONTEND_URI);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const approve = async (req, res) => {
    try {
        const approver = await AuthModel.findById(req.userId);

        if (!approver) {
            return res.status(404).send("User doesn't exist");
        }

        if (approver.role !== "Army Chief") {
            return res.status(404).send("You are not authorized to approve");
        }

        const user = await AuthModel.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User doesn't exist");
        }

        user.approved = true;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await AuthModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}