import axios from 'axios';
import * as Types from '../constants/ActionType'
import * as CallApis from './../constants/Apis'
import {toastMessage} from './../common/ToastHelper'


// 🔓  Login - Get user token
export const loginUser = (userData, history) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/user/login`)
    await axios.post(url, userData)
        .then(res =>  {  
            if (res.status===200 ) {           
                const token = res.data;        
                localStorage.setItem('jwtToken', token);           
                history.push('/books')
                dispatch({
                    type: Types.LOGIN,  //this call test dispatch. to dispsatch to our reducer
                    payload: true //sets payload to errors coming from server
                })
                toastMessage("Đăng nhập thành công")
              
            } else {
                toastMessage(res.data)                                 
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};

export const logOut = (flag) =>(dispatch)  => {

    localStorage.clear();
    if(flag===1){
        toastMessage("Phiên đăng nhập hết hạn")
    }else{
        toastMessage("Đăng xuất thành công")
    }
    dispatch({
        type: Types.LOG_OUT,  //this call test dispatch. to dispsatch to our reducer
        payload: false //sets payload to errors coming from server
    })
    
};
export const expired = () =>(dispatch)  => {

    localStorage.clear();
    toastMessage("Phiên bản hết hạn")
    dispatch({
        type: Types.LOG_OUT,  //this call test dispatch. to dispsatch to our reducer
        payload: false //sets payload to errors coming from server
    })
    
};

export const registerUser = (userData, history) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/user/register`)
    await axios.post(url, userData)
        .then(res =>  {  
            if (res.status===200 ) {
                
                history.push('/',{email:userData.email})
                toastMessage("Đăng ký thành công")
            }else {
                toastMessage("Vui lòng nhập đầy đủ thông tin")
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};

export const loginFacebook = (accessToken) =>(dispatch)  => {
      toastMessage("Đăng nhập thành công");
      localStorage.clear();
      localStorage.setItem('jwtToken', accessToken);  
      console.log(accessToken)
    dispatch({
        type: Types.LOGIN_FACEBOOK,  //this call test dispatch. to dispsatch to our reducer
        payload: true //sets payload to errors coming from server
    })
    
};

export const loginGoogle = (accessToken) =>(dispatch)  => {
    toastMessage("Đăng nhập thành công");
    localStorage.clear();
    localStorage.setItem('jwtToken', accessToken);  
    console.log(accessToken)
  dispatch({
      type: Types.LOGIN_GOOGLE,  //this call test dispatch. to dispsatch to our reducer
      payload: true //sets payload to errors coming from server
  })
  
};





