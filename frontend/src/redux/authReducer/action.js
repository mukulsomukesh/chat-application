import axios from "axios";
import * as types from "./actionType";

//  sign up user / create account
const createAccount = (user) => async (dispatch) => {
    dispatch({type: types.SIGN_UP_REQUEST_PROCESSING});
    try {
        const result = await axios.post("http://localhost:8080/api/user", user)
        dispatch({ type: types.SIGN_UP_REQUEST_SUCCESS, payload: result});
    } catch (error) {
        dispatch({ type: types.SIGN_UP_REQUEST_FAILED, payload: error.response.data.error});
    }
}

//  sign in user 
const signInAccount = (user) => async (dispatch) => {
    dispatch({type: types.SIGN_IN_REQUEST_PROCESSING});
    try {
        const result = await axios.post("http://localhost:8080/api/user/login", user)

        localStorage.setItem("chat-app-login-user-data", JSON.stringify(result.data));
        dispatch({ type: types.SIGN_IN_REQUEST_SUCCESS, payload: result.data});
    } catch (error) {
        dispatch({ type: types.SIGN_IN_REQUEST_FAILED, payload: error.response.data.error});
    }
}

// logout user
const logoutAccount = () => (dispatch)=>{
    localStorage.removeItem('chat-app-login-user-data');
    dispatch({type: types.LOGOUT_REQUEST});
}

export {createAccount, signInAccount, logoutAccount};