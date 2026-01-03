const mongoose=require("mongoose");
const axios = require('axios');
require("dotenv").config();

exports.apicontroller=async(req,res)=>{

    try {

        const { content } = req.body;
    
        const response = await axios.post( `${process.env.GOOGLE_AI_STUDIO_ENDPOINT}?key=${process.env.GOOGLE_AI_STUDIO_API_KEY}`,
          {
            contents: [{ parts: [{ text: content }] }]
          }
        );
    
        res.json(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}