import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signInAccount } from '../redux/authReducer/action';
import * as types from "../redux/authReducer/actionType";

export default function PrivateRoute({children}) {

    const sign_in_success = useSelector((state)=> state.authReducer.sign_in_success);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("private")
        if (localStorage.getItem('chat-app-login-user-data') !== null) {
            dispatch({ type: types.SIGN_IN_REQUEST_SUCCESS, payload: "Login Success." });
          }
    })

    if(!sign_in_success){
 
        // store requested page url in local storage
        localStorage.setItem("chat-app-redirect-url", window.location.pathname);
 
        return <Navigate to="/signup"> </Navigate>
    }
    else{
        return children
    }
}
