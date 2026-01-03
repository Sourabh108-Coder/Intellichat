const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const {User } = require("../models/usermodel");
const jwt=require("jsonwebtoken");
require("dotenv").config();


exports.signupcontroller=async(req,res)=>{

    try{
        const {FirstName,LastName,Email,Password}=req.body;

        const existemail = await User.findOne({email:Email}); 

        if(existemail)
        {
            return res.status(500).json(
                {
                    success:false,
                    message:"User Already Exist",
                }
            );
        }

        let hashpassword;

        try{

            hashpassword = await bcrypt.hash(Password,10);
        }
        catch(error){

            return res.status(500).json(
                {
                    success:false,
                    message:"Cannot hash password",
                }
            );
        }

        let user=await User.create(
            {FirstName,LastName,Email,Password:hashpassword}
        )

        
        const payload={
            email:user.Email,
            id:user._id,
        };

        const token=jwt.sign(payload,process.env.JWT_SECRET);

        user=user.toObject();
        user.token=token,
        user.Password=undefined;

        return res.status(201).json(
            {
                success:true,
                data:user,
                message:"User Created SuccessFully",

            }
        );

    }
    catch(error){

        return res.status(500).json(
            {
                success:false,
                data:"Internal Error",
                message:error.message,

            }
        );
    }
};



exports.logincontroller=async(req,res)=>{

    try{

        const{Email,Password}=req.body;

        if(!Email || !Password)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Please provide Email or Password",
                }
            );
        }

        let user= await User.findOne({Email});

        if(!user)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"User Not  Found",
                }
            );
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if(!isPasswordValid)
        {

            return res.status(401).json(
                {
                    success:false,
                    message:"Password Incorrect",
                }
            )
        }


        const payload={
            email:user.Email,
            id:user._id,
        };

        const token=jwt.sign(payload,process.env.JWT_SECRET);

        user=user.toObject();
        user.token=token,
        user.Password=undefined;

        res.status(200).json(
            {
                success:true,
                token,
                user,
                message:"User Logged In"
            }
        );

    }
    catch(error){

        res.status(500).json(
            {
                success:false,
                data:"Internal Error",
                message:error.message,

            }
        );
    }
};

exports.logoutcontroller=async(req,res)=>{

    try{
        res.clearCookie('auth_token',{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/",
        });
        return res.status(200).json(
            {
                success:true,
                message:"LogOut SuccessFully",
            }
        );
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json(
        {
            success: false,
            message: "Internal Server Error"
        });
    }
};


