import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    const isAlreadyExisting = await User.findOne({ email });
    if (isAlreadyExisting) {
      return res.status(400).json({ message: "User already exists" });
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    if (newUser) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log("Error in signupController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const isUserExsiting = await User.findOne({ email });
    if (!isUserExsiting) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExsiting.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const jwtToken = jwt.sign(
      { _id: isUserExsiting._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.cookie("token", jwtToken, {
      httpOnly: true, //prevents xss(cross site scripting) by not allowing js to access the cookie
      secure: process.env.ENVIRONMENT == "production", // https only in production, not in development, for same site requests
      sameSite: "none", // cross site requests Strict or none
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
    const userDetails = isUserExsiting.toObject();
    delete userDetails.password;
    res.status(200).json({
      ...userDetails,
    });
  } catch (error) {
    console.log("Error in loginController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logoutController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfileController = async (req, res) => {
  const { profilePicture } = req.body;
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      req.loggedInUser._id,
      {
        profilePicture: cloudinaryResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
    });
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log("Error in updateProfileController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.loggedInUser);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export {
  signupController,
  loginController,
  logoutController,
  updateProfileController,
};
