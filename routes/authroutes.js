const express=require("express");

const { signupcontroller, logincontroller, logoutcontroller} = require("../controllers/authcontroller");

const{chatcontroller }=require("../controllers/chatcontroller");
const { apicontroller } = require("../controllers/apicontroller");
const { gethistorycontroller } = require("../controllers/gethistorycontroller");

const router=express.Router();

router.post("/signup",signupcontroller);

router.post("/login",logincontroller);

router.post("/logout",logoutcontroller);

router.post("/chats",chatcontroller);

router.post("/generateContent", apicontroller);

router.post("/userhistory",gethistorycontroller);

module.exports=router;