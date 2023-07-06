import axios from "axios";
import * as types from "./actionType";

const END_POINT="https://chatc.onrender.com"

//  sign up user / create account
const createAccount = (user) => async (dispatch) => {
    dispatch({ type: types.SIGN_UP_REQUEST_PROCESSING });
    try {
        const result = await axios.post(`${END_POINT}/api/user`, user)

        // remove previous login user info
        localStorage.removeItem('chat-app-login-user-data');

        dispatch({ type: types.SIGN_UP_REQUEST_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: types.SIGN_UP_REQUEST_FAILED, payload: error.response.data.error });
    }
}

//  sign in user 
const signInAccount = (user) => async (dispatch) => {

    dispatch({ type: types.SIGN_IN_REQUEST_PROCESSING });
    try {
        const result = await axios.post(`${END_POINT}/api/user/login`, user)

        // save user info in local storage
        localStorage.setItem("chat-app-login-user-data", JSON.stringify(result.data));
        dispatch({ type: types.SIGN_IN_REQUEST_SUCCESS, payload: "Login Success." });
    } catch (error) {
        dispatch({ type: types.SIGN_IN_REQUEST_FAILED, payload: error.response.data.error });
    }
}

// logout user
const logoutAccount = () => (dispatch) => {
    localStorage.removeItem('chat-app-login-user-data');
    dispatch({ type: types.LOGOUT_REQUEST });
}


// update user data
const updateUserData = (pic, token) => async (dispatch) => {
    dispatch({ type: types.UPDATE_USER_DATA_REQUEST_PROCESSING });
    try {
        const result = await axios.put(`${END_POINT}/api/user`, {pic}, {
            headers: {
              Authorization: "Bearer " + String(token)
            }
          })

        // update information in local storage also
        localStorage.removeItem('chat-app-login-user-data');
        localStorage.setItem("chat-app-login-user-data", JSON.stringify(result.data));
        dispatch({ type: types.UPDATE_USER_DATA_REQUEST_SUCCESS, payload: "User Data Update Successfully." });
    } catch (error) {
        dispatch({ type: types.UPDATE_USER_DATA_REQUEST_FAILED, payload: error.response.data.error });
    }
}


export { createAccount, signInAccount, logoutAccount, updateUserData };