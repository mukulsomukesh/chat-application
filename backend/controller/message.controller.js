const asyncHandler = require("express-async-handler");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(500).json({ error: "Message or chatId missing." });
  }

  const messageObj = {
    sender: req.user._id,
    message: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(messageObj);

    message = await message.populate("sender", "name pic");

    message = await message.populate("chat", "chatName isGroupChat users");

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Message could not be sent." });
  }
});

module.exports = { sendMessage };
