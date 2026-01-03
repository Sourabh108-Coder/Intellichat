import Templates from '../components/Templates';

const loginpage = (props) => {
    let LogIn=props.LogIn;
    let SetLogIn=props.SetLogIn;
    let SetUserId=props.SetUserId;
    let formtype="Login";
    let heading="Welcome Back";
    let desc1="Build skills for today, tommorow and beyond.";
    let desc2="Education to future -proof your career";
    let image="https://www.veropool.com/wp-content/uploads/2022/05/dancing-robot-2.gif";

  return (
    <div className='log-page'>
      <Templates formtype={formtype} heading={heading} desc1={desc1} desc2={desc2} image={image}  LogIn={LogIn} SetLogIn={SetLogIn} SetUserId={SetUserId} />
    </div>
  )
}

export default loginpage
