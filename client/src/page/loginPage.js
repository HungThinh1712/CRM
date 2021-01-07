import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Logo from './../common/logo_hcmute.png'
import * as authAction from './../actions/authAction'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import { toastMessage } from '../common/ToastHelper';

const  SignIn= (props) => {
  const dispatch = useDispatch();

  const [email, setEmailState] = useState(props.history.location.state ? props.history.location.state.email :"");
  const [password, setPasswordState] = useState("");

  const handleEmailInputChange = e => {
    setEmailState(e.target.value);
  };
  
  const handlePasswordInputChange = e => {
    setPasswordState(e.target.value);
  };

  const handleSubmit = async e => {
    const userData = { email, password };
    dispatch(authAction.loginUser(userData,props.history))
   
  };
  
  const responseFacebook =(response)=>{

      if(response.accessToken){
        dispatch(authAction.loginFacebook(response.accessToken)) 
        console.log(response);
        props.history.push('/books');
      }
      else{
        
      }
  }
  const responseGoogle =(response)=>{

   
    if(response){
      dispatch(authAction.loginGoogle(response.accessToken)) 
      props.history.push('/books');
    }
    else{
      toastMessage("Đăng nhập thất bại")
    }
}
  
  return (
      <div className="signin-signup">
          <form  className="sign-in-form">
            <img  style={{width:'70px',height:'80px'}} src={Logo} alt=""/>
            <h2 className="title">Đăng nhập</h2>
            <div className="input-field-login">
              <i className="fas fa-envelope"></i>
              <input value={email} type="text" onChange={handleEmailInputChange} placeholder="Email" />
            </div>
            <div className="input-field-login">
              <i className="fas fa-lock"></i>
              <input type="password" onChange={handlePasswordInputChange} placeholder="Mật khẩu" />
            </div>
            <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmit} >Đăng nhập</div>
            <div style={{color:'blueviolet',cursor:'pointer'}} onClick={()=>props.history.push('/register')}>Chưa có tài khoản? Đăng ký</div>   
            <div className="social-media" style={{marginTop:'10px'}}>
              <div className="social-icon">
              <FacebookLogin
              appId="910279679509473"
              callback={responseFacebook}
              render={renderProps => (
                <i className="fab fa-facebook-f"  onClick={renderProps.onClick}></i>
              )}
              icon="fa-facebook" />
              </div>
              <div className="social-icon">
              <GoogleLogin
              clientId="466677084136-vkvki5nla0hgf9b0058j09fsn7uh6jvc.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              render={renderProps => (
                <i className="fab fa-google"  onClick={renderProps.onClick}></i>
                
              )}
              cookiePolicy={'single_host_origin'}
               />
              </div>
            </div>
           
          </form>
          
        </div>


  );
}
export default withRouter(SignIn)