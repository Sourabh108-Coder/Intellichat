import { useEffect } from 'react';
import Chatbot from '../components/Chatbot'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = (props) => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("intellichattoken")){

      navigate("/login");
      toast.info("Login to access functionality!");
    }
  },[])

  let UserId=props.UserId;
  let SetUserId=props.SetUserId;
  
  return (
    <div>
      <Chatbot UserId={UserId} SetUserId={SetUserId}/>
    </div>
  )
}

export default Dashboard
