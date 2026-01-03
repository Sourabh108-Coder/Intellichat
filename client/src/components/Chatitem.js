import { PiOpenAiLogoFill } from "react-icons/pi";
import { IoPersonCircleSharp } from "react-icons/io5";

const chatitem = (props) => {

    let content=props.content;
    let user=props.user;
    
  return (
    <div>
        {
            user==="Me"? 
            (
                <div className='user-div'>
                    <div className='flex-item'><IoPersonCircleSharp className='chat-icon'/></div>
                    <div>{content}</div>
                </div>
            )
            :
            (
                <div className='chatgpt-div'>
                   <div className='flex-item'><PiOpenAiLogoFill className='chat-icon'/></div>
                   <div>{content}</div>
                </div>
            )
        }
    </div>
  )
}

export default chatitem
