import * as types from "./actionType"

const initialState = {

    isSearchUserProcessing: false,
    isSearchUserSuccess: false,
    searchedUser: [],

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
        default:
            return state;
    }
}