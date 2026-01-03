import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useState } from 'react';

const Signupform = (props) => {

    const navigate= useNavigate();
    let SetLogIn=props.SetLogIn;
    let SetUserId=props.SetUserId;


    const[FormData,SetFormData]=useState(
        {
          FirstName:"",
          LastName:"",
          Email:"",
          Password:"",
          ConfirmPassword:"",
        }
      )
  
      function ChangeHandler(event){
  
        const{name,value}= event.target;
  
        SetFormData(prev=>{
          return{
            ...prev,
            [name]:value
          }
        })
      }
  
      async function submitHandler(event){
          event.preventDefault();
  
          if(FormData.Password!==FormData.ConfirmPassword)
          {
            toast.error("Check your Password")
            return
          }
          
          else if(FormData.Password.length<6)
          {
            toast.warning("Please Create a Password of at least 6 Characters long")
            return
          }

          else if(FormData.FirstName.length<4 || FormData.LastName.length<5)
          {
            toast.warning("Please Enter a Valid Name")
            return
          }
  
          else{

            try {
              const response= await axios.post('/api/v1/auth/signup',FormData);

              const data=await response.data;

              if(data.success)
              {
                localStorage.setItem('intellichattoken',data.data.token);
                localStorage.setItem('intellichatuser',JSON.stringify(data.data._id));
                SetLogIn(true);
                SetUserId(data.data._id);
                toast.success("Account Created Successfully");
                navigate("/dashboard");
              }

              else
              {
                toast.error(data.message);
              }

            } 
            catch (error) {

              console.log("Error in Sign Up"+ error);

              toast.error("Check Your Email");
            }      
          }
      }

    function navigation()
    {
      navigate("/login");
    }
  return (
    <div>
        <form onSubmit={submitHandler} className='form-log-ele'>

          <div className='log-fir-las'>

            <div className='fir-las'>
            <div className='fir-name'>
              <br/>
              <label htmlFor='FirstName'>First Name</label>
              <br/>
              <input type="text" id="FirstName" required name="FirstName" value={FormData.FirstName} onChange={ChangeHandler} placeholder='Enter your First Name' className='input2-field'/>
              <br/>
            </div>

            <div className='las-name'>
              <br/>
              <label htmlFor='LastName'>Last Name</label>
              <br/>
              <input type="text" id="LastName" required name="LastName" value={FormData.LastName} onChange={ChangeHandler} placeholder='Enter your last Name' className='input2-field'/>
              <br/>
            </div>
            </div>

          </div>

          <br/>
          <label htmlFor='email'>Email Address</label>
          <br/>
          <input type="email" id="email" required name="Email" value={FormData.Email} onChange={ChangeHandler} placeholder='Enter your Email Address' className='input3-field'autoComplete="username"/>
          <br/>

          <div className='pass-con-log'>
              <div>
                <br/>
                <label htmlFor='password'>Create Password</label>
                <br/>
                <input type="password" id="password" required name="Password" value={FormData.Password} onChange={ChangeHandler}  placeholder='Enter your Password' className='input2-field' autoComplete="new-password"/>
                <br/>
              </div>

              <div>
                <br/>
                <label htmlFor='confirmpassword'>Confirm Password</label>
                <br/>
                <input type="password" id="confirmpassword" required name="ConfirmPassword" value={FormData.ConfirmPassword} onChange={ChangeHandler} placeholder='Confirm your Password' className='input2-field' autoComplete="new-password"/>
                <br/>

              </div>
          </div>

          <br/>

          <div className="frame">
            <button className="custom-btn2 btn-78 buttons" onClick={navigation}><span>Already have an Account? Sign In</span></button>
          </div>

          <div className='wrap'>
          <button type="submit" className='button'>Create Account</button>
          </div>
        </form>
    </div>
  )
}

export default Signupform
