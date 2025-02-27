import express from "express";
import {
  getUsersController,
  getMessagesController,
  sendMessage,
} from "../controller/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/message/users", protect, getUsersController);
router.get("/message/:id", protect, getMessagesController);
router.post("/message/:id", protect, sendMessage);
export default router;
