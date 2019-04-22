import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../actions/actionTypes';
import jwtDecode from 'jwt-decode';

const isBrowser = typeof window !== 'undefined';

const initialState = {
    isAuthenticated: checkTokenExpiry(),
    profile: getProfile(),
    error: ''
}

function checkTokenExpiry() {
    let jwt = null;
    if(!isBrowser) {
        return false;
    } else {
        jwt = localStorage.getItem('id_token');
    }
    if(jwt) {
        let jwtExp = jwtDecode(jwt).exp;
        let expiryDate = new Date(0);
        expiryDate.setUTCSeconds(jwtExp);

        if(new Date() < expiryDate) {
        return true;
        }
    }
    return false;  
}

function getProfile() {
    if(!isBrowser) {
        return null;
    } else if (localStorage.getItem('profile') !== 'undefined') {
        return JSON.parse(localStorage.getItem('profile'));
    } else {
        return null;
    }
}

const auth = (state = initialState, action) => {
switch (action.type) {
    case LOGIN_SUCCESS:
    return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        profile: action.payload.profile,
        error: ''
    }
    case LOGIN_ERROR:
    return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        profile: null,
        error: action.payload.error
    }
    case LOGOUT_SUCCESS:
    return {
        ...state,
        isAuthenticated: checkTokenExpiry(),
        profile: null,
        error: ''
    }
    default:
        return state;
    }
}

export default auth;
  