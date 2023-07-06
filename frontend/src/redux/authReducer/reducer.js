import * as types from "./actionType"

const initialState = {
    sign_up_processing: false,
    sign_up_failed: false,
    sign_up_success: false,
    sign_up_message: "",
    sign_up_user: {},

    sign_in_processing: false,
    sign_in_failed: false,
    sign_in_success: false,
    sign_in_message: "",
    sign_in_User: {},

    user_update_processing: false,
    user_update_success: false,
    user_update_failed: false,
    user_update_message: "",
}

export const reducer = (state = initialState, action) => {

    const { type, payload } = action;
    switch (type) {
        case types.SIGN_UP_REQUEST_PROCESSING:
            return {
                ...state,
                sign_up_processing: true,
                sign_up_failed: false,
                sign_up_success: false,
            };
        case types.SIGN_UP_REQUEST_FAILED:
            return {
                ...state,
                sign_up_processing: false,
                sign_up_failed: true,
                sign_up_success: false,
                sign_up_message: payload
            };
        case types.SIGN_UP_REQUEST_SUCCESS:
            return {
                ...state,
                sign_up_processing: false,
                sign_up_failed: false,
                sign_up_success: true,
                sign_up_message: "Account Successfully Created."
            };

        case types.SIGN_IN_REQUEST_PROCESSING:
            return {
                ...state,
                sign_in_processing: true,
                sign_in_failed: false,
                sign_in_success: false,
            };
        case types.SIGN_IN_REQUEST_FAILED:
            return {
                ...state,
                sign_in_processing: false,
                sign_in_failed: true,
                sign_in_success: false,
                sign_in_message: payload
            };
        case types.SIGN_IN_REQUEST_SUCCESS:
            return {
                ...state,
                sign_in_processing: false,
                sign_in_failed: false,
                sign_in_success: true,
                sign_in_message: payload
            };
        case types.LOGOUT_REQUEST:
            return {
                ...state,
                sign_up_processing: false,
                sign_up_failed: false,
                sign_up_success: false,
                sign_up_message: "",
                sign_up_user: {},

                sign_in_processing: false,
                sign_in_failed: false,
                sign_in_success: false,
                sign_in_message: "",
                sign_in_User: {},
            };

        case types.UPDATE_USER_DATA_REQUEST_PROCESSING:
            return {
                ...state,
                user_update_processing: true,
                user_update_success: false,
                user_update_failed: false,
                user_update_message: "",
            };
        case types.UPDATE_USER_DATA_REQUEST_FAILED:
            return {
                ...state,
                user_update_processing: false,
                user_update_success: false,
                user_update_failed: true,
                user_update_message: payload,
            };
        case types.UPDATE_USER_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                user_update_processing: false,
                user_update_success: true,
                user_update_failed: false,
                user_update_message: payload,
            };
        default:
            return state;
    }
}