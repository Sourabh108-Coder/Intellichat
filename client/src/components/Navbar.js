import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

  let LogIn=props.LogIn;
  let SetLogIn=props.SetLogIn;

  const navigate= useNavigate();


  async function ChangeHandler(){

    try {
      localStorage.removeItem('intellichattoken');
      localStorage.removeItem('intellichatuser');
      SetLogIn(false);
      toast.success("Logout SucessFully !!!");

      navigate("/");
      
    } catch (error) {

      toast.error(error.message);
      
    }
  }



  return (
    <div className='nav-bar'>
       <Link to ='/'><div className='logo-name'>
          
          <div><img src="https://img1.picmix.com/output/stamp/normal/9/5/8/2/1522859_96f7f.gif" className='logo-img'/></div>
          <h1 className='head'>IntelliChat</h1>
        </div></Link>

        <div className='buttons'>
            <Link to="/"  className='li-ar'><button className="glow-on-hover">Home</button></Link>
            {
                !LogIn &&
                <Link to="/login"  className='li-ar'><button className="glow-on-hover">Log In</button></Link>
            }

            {
                !LogIn &&
                <Link to="/signup"  className='li-ar'><button className="glow-on-hover">Sign Up</button></Link>
            }

            {
                LogIn &&
                <Link to="/login" onClick={ChangeHandler}  className='li-ar'><button className="glow-on-hover">Logout</button></Link>
            }

            {
                LogIn &&
                <Link to="/history"  className='li-ar'><button className="glow-on-hover">History</button></Link>
            }

            {
                LogIn &&
                <Link to="/dashboard"  className='li-ar'><button className="glow-on-hover">Chat</button></Link>
            } 
        </div>
    </div>
  )
}

export default Navbar
