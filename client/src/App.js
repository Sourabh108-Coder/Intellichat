import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Dashboard from './pages/Dashboard';
import { useEffect, useState} from 'react';
import History from './pages/History';


function App() {

  const[LogIn,SetLogIn]=useState(false);
  const[UserId,SetUserId]=useState("");

  useEffect(()=>{
    if(localStorage.getItem("intellichattoken"))
    {
      SetLogIn(true);
      SetUserId(localStorage.getItem("intellichatuser"));
    }
  },[]);

  return (
    <div className="App">
      <Navbar LogIn={LogIn} SetLogIn={SetLogIn}/>

      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Loginpage  LogIn={LogIn} SetLogIn={SetLogIn} UserId={UserId} SetUserId={SetUserId} />}/>
        <Route path="/signup" element={<Signuppage  LogIn={LogIn} SetLogIn={SetLogIn} UserId={UserId} SetUserId={SetUserId}/>}/>
        <Route path="/dashboard" element={<Dashboard UserId={UserId} SetUserId={SetUserId}/>}/>
        <Route path = "/history" element ={<History UserId={UserId} />}/>
      </Routes>
    </div>
  );
}

export default App;
