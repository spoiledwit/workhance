import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/Auth.js";
import EmployerModel from "../models/Employer.js";
import dotenv from "dotenv";
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
