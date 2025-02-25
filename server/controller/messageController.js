import User from "../model/userModel.js";
import Message from "../model/messageModel.js";
import cloudinary from "../lib/cloudinary.js";
const getUsersController = async (req, res) => {
  try {
    const allUsers = await User.find({
      _id: { $ne: req.loggedInUser._id },
    }).select("-password");
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error("Error in getUsersController", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
const getMessagesController = async (req, res) => {
  try {
    const friendId = req.params.id;
    const myId = req.loggedInUser._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: friendId },
        { senderId: friendId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Oops! Something went wrong: ", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
const sendMessage = async (req, res) => {
  const receiverId = req.params.id;
  const senderId = req.loggedInUser._id;
  const { text, image } = req.body;

  try {
    let imageUrl;
    if (image) {
      let uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.url;
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    //add socket functionality herel
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Oops! Something went wrong: ", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
export { getUsersController, getMessagesController };
