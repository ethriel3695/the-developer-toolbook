import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../actions/actionTypes';
// import jwtDecode from 'jwt-decode';

const isBrowser = typeof window !== 'undefined';
const initialState = {
    isAuthenticated: checkTokenExpiry(),
    profile: null,
    error: ''
}

function checkTokenExpiry() {
    // let jwt = null;
    let expiresAt = null;
    if(!isBrowser) {
        return false;
    } else {
        expiresAt = localStorage.getItem('expires_at');
    }
    // if(jwt) {
        // let jwtExp = jwtDecode(jwt).exp;
        let expiryDate = new Date(0);
        expiryDate.setUTCSeconds(expiresAt);

        if(new Date() < expiresAt) {
        return true;
        }
    // }
    return false;  
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
        isAuthenticated: checkTokenExpiry(),
        profile: null,
        error: ''
    }
    default:
        return state;
    }
}

export default auth;
  