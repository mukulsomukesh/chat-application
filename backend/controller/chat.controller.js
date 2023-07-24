const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");
const User = require("../models/user.model")

// access chat
const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "userId not present in the request body." });
    }

    try {
        const existingChat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [req.user._id, userId] }
        }).populate("users", "-password").populate("latestMessage").populate("latestMessage.sender");

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const newChat = new Chat({
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        });

        await newChat.save();

        const populatedChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password");

        res.status(201).json(populatedChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// get chat
const getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', 'pic email name _id') // Populate the 'users' field with only the specified fields
            .populate('latestMessage'); // Populate the 'latestMessage' field

        if (chats.length === 0) {
            return res.status(422).json({ message: "No chats found." });
        }

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// create group chat 
const createGroupChat = asyncHandler(async (req, res) => {

    if (!req.body.users && !req.body.name) {
        return res.status(422).json({ error: "Please fill all the details." })
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(422).json({ error: "Minimum two users are required to create a group." })
    }

    users.push(req.user);

    try {

        const existingChat = await Chat.findOne({
            users: { $all: users },
            isGroupChat: true
        }).populate("users", "-password").populate("groupAdmin", "-password");

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const chatGroup = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const groupChatObj = await Chat.findOne({ _id: chatGroup._id }).populate("users", "-password").populate("groupAdmin", "-pasdsword")
        res.status(201).json(groupChatObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// rename group chat
const renameGroup = asyncHandler(async (req, res) => {

    const { chatId, chatName } = req.body;

    if (!chatName) {
        res.status(422).json({ error: "Please Enter New Name." })
    }

    const newChatObj = await Chat.findByIdAndUpdate(
        chatId,
        { chatName, },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!newChatObj) {
        res.status(404).json({ error: "Chat Not Found." })
    }
    else {
        res.status(200).json(newChatObj)
    }

})


// Remove user from chat group
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
        return res.status(404).json({ error: "Chat not found." });
    }

    const adminId = chat.groupAdmin.toString();

    const filteredUsers = userId.filter(id => id !== adminId);

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: { $in: filteredUsers } } },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(404).json({ error: "Chat not found." });
    } else {
        return res.status(200).json(updatedChat);
    }
});



// add other user to chat group
const addToGroup = asyncHandler(async (req, res) => {

    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
        return res.status(404).json({ error: "Chat not found." });
    }
    
    const newChatObj = await Chat.findByIdAndUpdate(
        chatId,
        { $addToSet: { users: { $each: userId } } },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!newChatObj) {
        res.status(404).json({ error: "Chat Not Found." })
    }
    else {
        res.status(200).json({data:newChatObj, message:"Successfully added to group"})
    }

})

module.exports = { accessChat, getChats, createGroupChat, renameGroup, removeFromGroup, addToGroup };