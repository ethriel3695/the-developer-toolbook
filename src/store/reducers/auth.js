import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    profile: null,
    error: ''
}

const auth = (state = initialState, action) => {
switch (action.type) {
    case LOGIN_SUCCESS:
    return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        profile: action.payload.profile,
        error: null
    }
    case LOGIN_ERROR:
    return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        profile: null,
        error: null
    }
    case LOGOUT_SUCCESS:
    return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        profile: null,
        error: ''
    }
    default:
        return state;
    }
}

export default auth;
  