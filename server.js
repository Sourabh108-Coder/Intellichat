const express=require("express");

const morgan=require("morgan");

const cors=require("cors");

const dbConnect=require("./config/databse");

const authroutes=require("./routes/authroutes");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const Port=process.env.PORT||4000;

const app=express();

app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({origin:"http://localhost:3000",credentials:true}));

app.use("/api/v1/auth",authroutes);


app.listen(Port,()=>{
    
    console.log("************Server Started on the Port"+" "+ Port+"*****************");
});

dbConnect();

app.get("/",(req,res)=>{

    res.send("<h1>This is Home Page</h1>")
})
