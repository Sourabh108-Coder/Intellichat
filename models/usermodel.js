const mongoose=require("mongoose");


const chatSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },

        content:{
            type:String,
            required:true,
        },
    },{ timestamps: true }
);


const userSchema=new mongoose.Schema(
    {
        FirstName:{

            type:String,
            required:[true,"This field is required"],
        },

        LastName:{

            type:String,
            required:[true,"This field is required"],
        },

        Email:{

            type:String,
            required:[true,"This field is required"],
            unique:true,
        },

        Password:{

            type:String,
            required:[true,"This field is required"],
            minlength:[6,"Characters Length should be six Characters long"],
        },

        chats:[chatSchema],

    }
);

const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema); 

module.exports = {
    User,
    Chat,
};