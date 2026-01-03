const mongoose = require("mongoose");
const { Chat, User } = require("../models/usermodel");


exports.gethistorycontroller = async (req, res) => {
  try {
    let { user } = req.body;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const userId = user.replace(/"/g, "").trim();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const userDoc = await User.findById(userId);

    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const chats = userDoc.chats.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return res.status(200).json({
      success: true,
      data: chats,
      message: "Chats fetched successfully",
    });

  } catch (error) {
    console.error("History API error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
