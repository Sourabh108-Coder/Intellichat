import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const History = ({ UserId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("intellichattoken")){
      navigate("/login");
      toast.info("Login to access functionality!");
    }
  },[])

  useEffect(() => {
    const fetchHistory = async () => {
      if (!UserId) return;

      try {
        const response = await axios.post("/api/v1/auth/userhistory", { user: UserId });
        const data = response.data;

        if (data.success) {
          const sortedChats = data.data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setChats(sortedChats);
          toast.success("History Fetched!!");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error in fetching history:", error);
        toast.error("Error in fetching History");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [UserId]);

  if (loading) return <p className="loading-text">Loading chat history...</p>;

  if (chats.length === 0) return <p className="loading-text">No chat history found</p>;

  return (
    <div className="hist-container">
      <h2 className="hist-title">Chat History</h2>
      <div className="hist-chats">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className='hist-chat-item'
          >
            <h2 className="chat-content">
               {chat.content}
            </h2>
            <h5 className="chat-timestamp">
              {new Date(chat.createdAt).toLocaleString()}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
