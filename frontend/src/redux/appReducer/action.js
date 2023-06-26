import axios from "axios";
import * as types from "./actionType";

const jwtToken = () => {
  const userData = JSON.parse(localStorage.getItem("chat-app-login-user-data"));
  return "Bearer " + String(userData.token);
};

// search users
const searchUsers = (query) => async (dispatch) => {
  dispatch({ type: types.SEARCH_USER_PROCESSING });
  try {
    const result = await axios.get(`http://localhost:8080/api/user?search=${query}`, {
      headers: {
        Authorization: jwtToken() 
      }
    });
    dispatch({ type: types.SEARCH_USER_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: types.SEARCH_USER_FAIL });
  }
};

export { searchUsers };
