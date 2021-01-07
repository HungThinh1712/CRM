import React, {useState} from 'react';
import Logo from './../common/logo_hcmute.png'
import {useDispatch} from 'react-redux'
import * as authAction from './../actions/authAction'
const RegisterPage = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const handleEmailInputChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = e => {
    setPassword(e.target.value);
  };
  const handleFirstNameInputChange = e => {
    setFirstName(e.target.value);
  };

  const handleLastNameInputChange = e => {
    setLastName(e.target.value);
  };
  
  const handleSubmit = async e => {
    const userData ={email,password,firstname,lastname}
    dispatch(authAction.registerUser(userData,props.history))
    
  };
  return (
    <div className="signin-signup">
      <form className="sign-up-form">
        <img style={{ width: '70px', height: '80px' }} src={Logo} alt="" />
        <h2 className="title">Đăng ký</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input value={lastname} type="text" onChange={handleLastNameInputChange} placeholder="Nhập họ" />
        </div>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input value={firstname} type="text" onChange={handleFirstNameInputChange} placeholder="Nhập tên" />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input value={email} type="text" onChange ={handleEmailInputChange} placeholder="Nhập email" />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input value={password} type="password" onChange={handlePasswordInputChange} placeholder="Nhập mật khẩu" />
        </div>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} onClick ={handleSubmit} className="btn_register solid" >Đăng ký</div>
        <div style={{ color: 'blueviolet', cursor: 'pointer' }} onClick={() => props.history.push('/')}>Đã có tài khoản? Đăng nhập</div>

      </form>


    </div>


  );
};

export default RegisterPage;