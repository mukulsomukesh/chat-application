import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {

    const sign_in_success = useSelector((state)=> state.authReducer.sign_in_success);

    if(!sign_in_success){
 
        // store requested page url in local storage
        localStorage.setItem("chat-app-redirect-url", window.location.pathname);
 
        return <Navigate to="/signup"> </Navigate>
    }
    else{
        return children
    }
}
