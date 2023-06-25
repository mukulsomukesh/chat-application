const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");
const User = require("../models/user.model")
// access chat
const accessChat = asyncHandler(async (req, res)=>{
  
    const {userId} = req.body;
console.log(userId)
    if(!userId){
       return res.status(500).json({error:"userId not present in req body."})
    }

    let isChat = await Chat.find({
        isChatGroup: false,
        $and:[
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ]
    }).populate("users","-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path:"latestMessage.sender",
        select:"name pic email",
    })
    
    if(isChat.length>0){
        res.send(isChat[0])
    }
    else{
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users:[req.user._id, userId],
        }

        try {
            const createChat = await Chat.create(chatData);

            const fullChat = await Chat.findOne({_id: createChat._id}).populate("users","-password");

            res.status(200).json(fullChat);

        } catch (error) {
            res.status(500).json({error:error.message});
        }

    }
    
}) 

// get chat
const getChats = asyncHandler(async (req, res)=>{
    
})

// create group chat 
const createGroupChat = asyncHandler(async (req, res)=>{
    
})

// rename group chat
const renameGroup = asyncHandler(async (req, res)=>{
    
})

// remove other user from group chat
const removeFromGroup = asyncHandler(async (req, res)=>{
    
})

// add other user to chat group
const addToGroup = asyncHandler(async (req, res)=>{
    
})

module.exports = { accessChat, getChats, createGroupChat, renameGroup, removeFromGroup, addToGroup };