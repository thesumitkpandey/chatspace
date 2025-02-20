import express from "express";
import {
  checkAuth,
  loginController,
  logoutController,
  signupController,
  updateProfileController,
} from "../controller/authController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.put("/updateprofile", protect, updateProfileController);
router.get("/checkauth", protect, checkAuth);
export default router;
