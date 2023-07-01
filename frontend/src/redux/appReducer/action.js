import axios, { all } from "axios";
import * as types from "./actionType";

const END_POINT = "http://localhost:8080/api"

const jwtToken = () => {
  const userData = JSON.parse(localStorage.getItem("chat-app-login-user-data"));
  return "Bearer " + String(userData.token);
};

// search users
const searchUsers = (query) => async (dispatch) => {

  if (query.length == 0) {
    return false
  }

  dispatch({ type: types.SEARCH_USER_PROCESSING });
  try {
    const result = await axios.get(`${END_POINT}/user?search=${query}`, {
      headers: {
        Authorization: jwtToken()
      }
    });
    dispatch({ type: types.SEARCH_USER_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: types.SEARCH_USER_FAIL });
  }
};

// creating one to one chat
const createSingleUserChat = (userId) => async (dispatch) => {
  dispatch({ type: types.SINGLE_CHAT_CREATE_PROCESSING });
  try {
    const result = await axios.post(`${END_POINT}/chat`, { userId: userId }, {
      headers: {
        Authorization: jwtToken()
      }
    });

    localStorage.setItem("chat-app-single-user-chat", JSON.stringify(result.data));
    dispatch({ type: types.SINGLE_CHAT_CREATE_SUCCESS, payload: result.data });

  } catch (error) {
    dispatch({ type: types.SINGLE_CHAT_CREATE_FAIL });
  }
}


//  get all chat 
const getChats = () => async (dispatch) => {
  dispatch({ type: types.ALL_CHATS_REQUEST_PROCESSING });
  try {
    const result = await axios.get(`${END_POINT}/chat`, {
      headers: {
        Authorization: jwtToken()
      }
    })
    dispatch({ type: types.ALL_CHATS_REQUEST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: types.ALL_CHATS_REQUEST_FAIL, payload: error.response.data.error });
  }
}


// creating group
const createGroup = (obj) => async (dispatch) => {
  dispatch({ type: types.CREATE_GROUP_REQUEST_PROCESSING });
  try {
    const result = await axios.post(`${END_POINT}/chat/group`, obj, {
      headers: {
        Authorization: jwtToken()
      }
    });

    dispatch({ type: types.CREATE_GROUP_REQUEST_SUCCESS, payload: result.data });

  } catch (error) {
    console.log(error)

    dispatch({ type: types.CREATE_GROUP_REQUEST_FAIL });
  }
}

// select user for chat
const selectUserForChat = (obj) => async (dispatch) => {
  dispatch({ type: types.SELECT_USER_FOR_CHAT, payload: obj });
}


// send message
const sendMessage = (obj) => async (dispatch) => {
  dispatch({ type: types.SEND_MESSAGE_REQUEST_PROCESSING });
  try {
    const result = await axios.post(`${END_POINT}/message`, obj, {
      headers: {
        Authorization: jwtToken()
      }
    });

    dispatch({ type: types.SEND_MESSAGE_REQUEST_SUCCESS, payload: result.data });

  } catch (error) {
    console.log(error)

    dispatch({ type: types.SEND_MESSAGE_REQUEST_FAIL });
  }
}


// get message
const getMessage = (id) => async (dispatch) => {
  console.log("id = ", id)
  dispatch({ type: types.GET_MESSAGE_REQUEST_PROCESSING });
  try {
    const result = await axios.get(`${END_POINT}/message/${id}`, {
      headers: {
        Authorization: jwtToken()
      }
    });

    dispatch({ type: types.GET_MESSAGE_REQUEST_SUCCESS, payload: result.data });

  } catch (error) {
    console.log(error)

    dispatch({ type: types.GET_MESSAGE_REQUEST_FAIL });
  }
}

// set web socket recieved message to messages
const setWebSocketReceivedMessage = (allMessages, receivedMessage) => async (dispatch) => {
  const messageId = receivedMessage._id;

  if (allMessages.length === 0 || !allMessages) {
    dispatch({ type: types.WEB_SOCKET_RECEIVED_MESSAGE, payload: receivedMessage });
    return;
  }

  if (allMessages.length > 1) {
    const isMessageAlreadyPresent = allMessages.some((message) => message._id === messageId);
    const isFirstChatMessage = allMessages[0].chat._id === receivedMessage.chat._id;

    if (!isMessageAlreadyPresent && isFirstChatMessage) {
      dispatch({ type: types.WEB_SOCKET_RECEIVED_MESSAGE, payload: receivedMessage });
    }
    return;
  }

  dispatch({ type: types.WEB_SOCKET_RECEIVED_MESSAGE, payload: receivedMessage });
};



export { searchUsers, createSingleUserChat, getChats, createGroup, selectUserForChat, sendMessage, getMessage, setWebSocketReceivedMessage };
