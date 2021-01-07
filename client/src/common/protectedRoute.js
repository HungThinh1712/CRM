import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {toastMessage} from './../common/ToastHelper'
import { isExpired, decodeToken } from "react-jwt";
import * as authAction from './../actions/authAction'
import { useSelector,useDispatch } from 'react-redux';

const ProtectedRoute = ({component:Component,...rest}) => {
    const token = localStorage.getItem('jwtToken') != null ? localStorage.getItem('jwtToken') : ""
    const isMyTokenExpired = isExpired(token);
    const tokenDecode = decodeToken(token);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)

    return (
        <Route {...rest} render={
            props=>{
                
                if(tokenDecode){
                    if(token!=="" && isMyTokenExpired===false){
                        return <Component {...props}/>
                    } else if(token!=="" && isMyTokenExpired===true){
                        dispatch(authAction.expired());
                        return <Redirect to='/'/>
                    }
                    else{
                        return <Redirect to='/'/>
                    }
                }
                else{
                    if(token!=="" ){
                        return <Component {...props}/>
                    } 
                    else{
                        return <Redirect to='/'/>
                    }
                }
            }
        }>

        </Route>
    );
};

export default ProtectedRoute;