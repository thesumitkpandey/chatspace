import express from "express";
import {
  getUsersController,
  getMessagesController,
} from "../controller/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
//START FROM HERE AT 1:16
router.get("/users", protect, getUsersController);
router.get("/:id", protect, getMessagesController);
export default router;
