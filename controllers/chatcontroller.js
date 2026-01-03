const mongoose=require("mongoose");

const { Chat, User } = require("../models/usermodel");


exports.chatcontroller=async(req,res)=>{

    try {
        const{user,content}=req.body;

        const userId = user.replace(/"/g, "").trim();

        const response= await Chat.create({user:userId,content});

        const updateuser=await User.findById(userId);
        
        updateuser.chats.push({ 
            _id: response._id,
            content: response.content
        });

        await updateuser.save();
    
        res.status(200).json(
            {
                success:true,
                data:updateuser,
                message:"Content Stored Successfully",
            }
        )
    } catch (error) {

        res.status(500).json(
            {
                success:false,
                data:error.message,
                message:"Error In Content Storation",
            }
        )
        
    }

}