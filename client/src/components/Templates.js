import Loginform from './Loginform.js';
import Signupform from './Signupform.js'


const Templates = (props) => {

  let LogIn=props.LogIn;
  let SetLogIn=props.SetLogIn;
  let SetUserId=props.SetUserId;

  return (
    <div className='final'>
        <div className='template-page'>

            <h1 className='log-head'>{props.heading}</h1>
            <p className='desc1-1'>{props.desc1}<br/><span className='desc2-2'>{props.desc2}</span></p>
            {props.formtype==="Login"?(<Loginform LogIn={LogIn} SetLogIn={SetLogIn} SetUserId={SetUserId}/>):(<Signupform LogIn={LogIn} SetLogIn={SetLogIn} SetUserId={SetUserId}/>)}

        </div>

        <div>
            <img src={props.image} className='logo-form-img'/>
        </div>
    </div>
  );
}


export default Templates
