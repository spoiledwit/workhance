import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/Auth.js";
import EmployerModel from "../models/Employer.js";
import dotenv from "dotenv";
import { createReadStream } from "fs";
import { error } from "console";
dotenv.config();

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user exists
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

    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
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
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }

    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    const employer = await EmployerModel.findById(user.employerId);
    res.status(200).json({ user, token, employer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.userId);
    const employer = await EmployerModel.findById(user.employerId);
    res.status(200).json({ user, employer });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await AuthModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { name, bio, profilePicture, userId } = req.body;
    if (userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to do this" });
    }
    const user = await AuthModel.findById(req.userId);
    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecommendedUsers = async (req, res) => {
  try {
    const users = await AuthModel.find({ _id: { $ne: req.userId } });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.userId) {
      return res.status(403).json({ message: "You cannot follow yourself" });
    }

    const userToFollow = await AuthModel.findById(userId);
    if (!req.userId) {
      return res.status(404).json({ message: "User not logged In" });
    }

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToFollow.followers.includes(req.userId)) {
      return res
        .status(403)
        .json({ message: "You are already following this user" });
    }

    userToFollow.followers.push(req.userId);
    await userToFollow.save();
    res.status(200).json(userToFollow);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.userId) {
      return res.status(403).json({ message: "You cannot unfollow yourself" });
    }

    const userToUnfollow = await AuthModel.findById(userId);
    if (!req.userId) {
      return res.status(404).json({ message: "User not logged In" });
    }

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.userId
    );
    await userToUnfollow.save();
    res.status(200).json(userToUnfollow);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addEducation = async (req, res) => {
  try {
    const userId = req.userId;
    const { values: education } = req.body;
    const user = await AuthModel.findById(userId);
    user.educations.push(education);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const userId = req.userId;
    const { educationId } = req.params;
    const { degree, school, isCurrent, description, startYear, endYear, grade } = req.body;
    const user = await AuthModel.findById(userId);
    const eduIndex = user.educations.findIndex(edu => edu._id.toString() == educationId);

    user.educations[eduIndex] = {
      school,
      grade,
      description,
      startYear,
      endYear,
      degree,
      isCurrent
    };

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addWorkExperience = async (req, res) => {
  try {
    const userId = req.userId;
    const { values: workExperience } = req.body;
    const user = await AuthModel.findById(userId);
    user.workExperiences.push(workExperience);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateWorkExperience = async (req, res) => {
  try {
    const userId = req.userId;
    const { workExperienceId } = req.params;
    const { company, position, startYear, endYear, isCurrent, description } = req.body;
    const user = await AuthModel.findById(userId);
    const workIndex = user.workExperiences.findIndex((work) => work._id.toString() == workExperienceId);

    user.workExperiences[workIndex] = {
      company,
      position,
      description,
      startYear,
      endYear,
      isCurrent
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const userId = req.userId;
    const { educationId } = req.params;
    const user = await AuthModel.findById(userId);
    user.educations = user.educations.filter(
      (edu) => edu._id.toString() !== educationId
    );
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteWorkExperience = async (req, res) => {
  try {
    const userId = req.userId;
    const { workExperienceId } = req.params;
    const user = await AuthModel.findById(userId);
    user.workExperiences = user.workExperiences.filter(
      (work) => work._id.toString() !== workExperienceId
    );
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const status = ["Not Verified", "Pending", "Verified"];
    const userId = req.userId;
    const { verificationStatus } = req.body;
    if (!status.includes(verificationStatus)) {
      return res.status(404).json({ message: "A server error occurred" })
    }
    const user = await AuthModel.findById(userId);
    user.verificationStatus = verificationStatus;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPendingUsers = async (req, res) => {
  try {
    const users = await AuthModel.find({ verificationStatus: "Pending" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

