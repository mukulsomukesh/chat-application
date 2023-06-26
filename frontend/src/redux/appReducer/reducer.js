import * as types from "./actionType"

const initialState = {

    isSearchUserProcessing: false,
    isSearchUserSuccess: false,
    searchedUser: [],

    singleUserChatProcessing:false,
    singleUserChatsuccess:false,
    singleUserChatObj:{},

    getAllChatProcessing:false,
    getAllChatSuccess:false,
    getAllChatFail:false,
    allChat:[]
}

export const reducer = (state = initialState, action) => {

    const { type, payload } = action;
    console.log(type, payload)
    switch (type) {
        case types.SEARCH_USER_PROCESSING:
            return {
                ...state,
                isSearchUserProcessing: true,
                isSearchUserSuccess: false,
                searchedUser: [],
            };
        case types.SEARCH_USER_SUCCESS:
            return {
                ...state,
                isSearchUserProcessing: false,
                isSearchUserSuccess: true,
                searchedUser: payload,
            };
        case types.SEARCH_USER_FAIL:
            return {
                ...state,
                isSearchUserProcessing: false,
                isSearchUserSuccess: false,
                searchedUser: [],
            };
            case types.SINGLE_CHAT_CREATE_PROCESSING:
                return {
                    ...state,
                    singleUserChatProcessing:true,
                    singleUserChatsuccess:false,
                    singleUserChatObj:{},
                };
            case types.SINGLE_CHAT_CREATE_SUCCESS:
                return {
                    ...state,
                    singleUserChatProcessing:false,
                    singleUserChatsuccess:true,
                    singleUserChatObj:payload,
                };
            case types.SINGLE_CHAT_CREATE_FAIL:
                return {
                    ...state,
                    singleUserChatProcessing:false,
                    singleUserChatsuccess:false,
                    singleUserChatObj:{},
                };

                case types.ALL_CHATS_REQUEST_PROCESSING:
                    return {
                        ...state,
                        getAllChatProcessing:true,
                        getAllChatSuccess:false,
                        getAllChatFail:false,
                        allChat:[]
                    };
                case types.ALL_CHATS_REQUEST_SUCCESS:
                    return {
                        ...state,
                        getAllChatProcessing:false,
                        getAllChatSuccess:true,
                        getAllChatFail:false,
                        allChat:payload
                    };
                case types.ALL_CHATS_REQUEST_FAIL:
                    return {
                        ...state,
                        getAllChatProcessing:false,
                        getAllChatSuccess:false,
                        getAllChatFail:true,
                        allChat:[]
                    };            
                     
        default:
            return state;
    }
}