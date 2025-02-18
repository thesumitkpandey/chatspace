import User from "../model/userModel.js";
import bcrypt from "bcrypt";
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
  }
};

const loginController = async (req, res) => {
  res.send("login Route");
};

const logoutController = async (req, res) => {
  res.send("logout Route");
};
export { signupController, loginController, logoutController };
