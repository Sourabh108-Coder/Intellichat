const mongoose=require("mongoose");

require("dotenv").config();

const dbConnect=()=>{

    mongoose.connect(process.env.DATABASE_URL,{
        
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })

    .then(()=>{

        console.log("*****************DataBase Connected SuccessFully******************");
    })

    .catch((error)=>{

        console.log("****************Error in Connecting Database****************");
        console.error(error.message);
        process.exit(1);
    });

}


module.exports=dbConnect;