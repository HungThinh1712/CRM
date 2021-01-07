
import * as Types from './../constants/ActionType'

const isAuthenticated = localStorage.getItem('jwtToken') != null ? true : false
const initialState = {
    isAuthenticated: isAuthenticated,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN:
            return {
                ...state,
                isAuthenticated: action.payload
            };
        case Types.LOG_OUT:
            return {
                ...state,
                isAuthenticated: action.payload
            };
        case Types.LOGIN_FACEBOOK:
            return {
                ...state,
                isAuthenticated: action.payload
            };
            case Types.LOGIN_GOOGLE:
                return {
                    ...state,
                    isAuthenticated: action.payload
                };

        default:
            return state;
    }
}
