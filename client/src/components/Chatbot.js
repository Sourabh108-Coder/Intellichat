import { useState , useRef }  from 'react';
import axios from 'axios';
import { IoPersonCircleSharp } from "react-icons/io5";
import Chatitem from './Chatitem';
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const Chatbot = (props) => {

  const inputRef = useRef(null);
  const[messages,Setmessages]=useState([]);

  let user=props.UserId;

  async function handleSubmit(){
    let content=inputRef.current.value.trim();

    if(content==="")
    {
      toast.warning("Please enter a message");
      return;
    }

    let content2=content;

    if(inputRef&&inputRef.current)
    {
      inputRef.current.value="";
    }

    const newMessage={user:"Me",content};

    Setmessages((prev)=>[...prev,newMessage]);

    try{

        const chatresponse= await axios.post('/api/v1/auth/generateContent',{content});
        
        content=(chatresponse.data.candidates[0].content.parts[0].text);

        const chatMessage={user:"GPT",content};

        Setmessages((prev)=>[...prev,chatMessage]);

      const userresponse=await axios.post('/api/v1/auth/chats',{user,content:content2});
    }

    catch(error){
      console.log("Error in fetching"+"  "+error)

    }
  }

  async function handledeletechats(){

    try {
      Setmessages([]);
      toast.success("Chats Cleared Successfully");
    } catch (error) {
      toast.error("Error in  Clearing Chats")
    }
  }

  return (
    <div className='chatbot-div'>

      <div className='clear-convo'>
        <div><IoPersonCircleSharp  className='icon-per'/></div>
        <p>You are talking to a chatbot</p>
        <p className='desp-para'>You can ask some questions related to study, bussiness, advices, education etc. But avoid 
        Sharing Personal Information.</p>
        <div className="frame"><button  onClick={handledeletechats} className="custom-btn btn-15">Clear Conversations</button></div>
      </div>
      <div className='actual-chat'>
        <h1 className='harding'>Intellichat 3.5 Turbo</h1>
        <div className='chat-api'>
          {
            messages.map((chat,index)=>{
              return(
                <Chatitem content={chat.content} user={chat.user} key={index}/>
              )
            })
          }
        </div>


        <div>
          <input type="text" className='user-input' ref={inputRef}/>
          <button className='send-icon'><BsFillSendArrowUpFill className='send-icon-img' onClick={handleSubmit}/></button>
        </div>
      </div>

    </div>
    
  )
}

export default Chatbot