import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Token Provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const userDetails = await User.findById(decoded._id).select("-password");
    if (!userDetails) {
      return res.status(401).json({ message: "User not found" });
    }
    req.loggedInUser = userDetails;
    next();
  } catch (error) {
    console.log("Error in protect middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default protect;
