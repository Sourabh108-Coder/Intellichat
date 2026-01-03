import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Loginform = (props) => {

  let SetLogIn=props.SetLogIn;
  let SetUserId=props.SetUserId;

  const navigate= useNavigate();

     const[FormData,SetFormData]=useState(
      {
        Email:"",
        Password:"",

      }
    )

    async function sumbitHandler(event){
      event.preventDefault();
      try {

        const response= await axios.post('/api/v1/auth/login',FormData);
        const data=await response.data;

        if(data.success)
        {
          const userid=data.user._id;
          toast.success("Login Successfully");
          localStorage.setItem('intellichattoken',data.token);
          localStorage.setItem('intellichatuser',JSON.stringify(userid));
          SetLogIn(true);
          SetUserId(userid);
          navigate("/dashboard");
        }

        else
        {
          toast.error(data.message);
        }

      } 
      catch (error) {

        console.log("Error in Login "+error)

        toast.error("Enter Correct Email or Password");
      }   
  
    }


    function ChangeHandler(event){

      const {name,value}=event.target;

      SetFormData((prev)=>{
        return{
          ...prev,
          [name]:value
        }
      })

    }

    function navigation()
    {
      navigate("/signup");
    }

  return (
    <div>
      <form onSubmit={sumbitHandler} className='form-log-ele'>
            <br/>
            <label htmlFor='email'>Email Address</label>
            <br/><br/>
            <input type="email" id="email" name="Email" value={FormData.Email} required onChange={ChangeHandler} placeholder='Enter your Email Address' className='input1-field' autoComplete="username"/>
            <br/>


            <br/>

            <div>
              <label htmlFor='password'>Enter password</label>
              <br/><br/>
              <input type="password" id="password" name="Password" value={FormData.Password} required onChange={ChangeHandler} placeholder='Enter your Password' className='input1-field' autoComplete="new-password"/>
              <br/>
            </div>

            <br/>

            <div className="frame">
            <button className="custom-btn2 btn-78 buttons" onClick={navigation}><span>Don't have any Account? Register</span></button>
            </div>

            <div className='wrap'>
              <button type="submit" className='button'>Sign In</button>
            </div>

        </form>
    </div>
  )
}

export default Loginform
