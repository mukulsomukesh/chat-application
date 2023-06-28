import * as types from "./actionType"

const initialState = {

    isSearchUserProcessing: false,
    isSearchUserSuccess: false,
    searchedUser: [],

    singleUserChatProcessing: false,
    singleUserChatsuccess: false,
    singleUserChatObj: {},

    getAllChatProcessing: false,
    getAllChatSuccess: false,
    getAllChatFail: false,
    allChat: [],

    createGroupChatProcessing: false,
    createGroupChatSuccess: false,
    createGroupChatFail: false,
    createGroupChatMessage: false,
    createdGouup: {},

}

export const reducer = (state = initialState, action) => {

    const { type, payload } = action;

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
                singleUserChatProcessing: true,
                singleUserChatsuccess: false,
                singleUserChatObj: {},
            };
        case types.SINGLE_CHAT_CREATE_SUCCESS:
            return {
                ...state,
                singleUserChatProcessing: false,
                singleUserChatsuccess: true,
                singleUserChatObj: payload,
            };
        case types.SINGLE_CHAT_CREATE_FAIL:
            return {
                ...state,
                singleUserChatProcessing: false,
                singleUserChatsuccess: false,
                singleUserChatObj: {},
            };

        case types.ALL_CHATS_REQUEST_PROCESSING:
            return {
                ...state,
                getAllChatProcessing: true,
                getAllChatSuccess: false,
                getAllChatFail: false,
                allChat: []
            };
        case types.ALL_CHATS_REQUEST_SUCCESS:
            return {
                ...state,
                getAllChatProcessing: false,
                getAllChatSuccess: true,
                getAllChatFail: false,
                allChat: payload
            };
        case types.ALL_CHATS_REQUEST_FAIL:
            return {
                ...state,
                getAllChatProcessing: false,
                getAllChatSuccess: false,
                getAllChatFail: true,
                allChat: []
            };

        case types.CREATE_GROUP_REQUEST_PROCESSING:
            return {
                ...state,
                createGroupChatProcessing: true,
                createGroupChatSuccess: false,
                createGroupChatFail: false,
                createGroupChatMessage: false,
                createdGouup: {},
            };
        case types.CREATE_GROUP_REQUEST_SUCCESS:
            return {
                ...state,
                createGroupChatProcessing: false,
                createGroupChatSuccess: true,
                createGroupChatFail: false,
                createGroupChatMessage: "Group Successfully Created.",
                createdGouup: payload,

            };
        case types.CREATE_GROUP_REQUEST_FAIL:
            return {
                ...state,
                createGroupChatProcessing: false,
                createGroupChatSuccess: false,
                createGroupChatFail: true,
                createGroupChatMessage: "Failed To Create Group",
                createdGouup:{},            
            };

        default:
            return state;
    }
}