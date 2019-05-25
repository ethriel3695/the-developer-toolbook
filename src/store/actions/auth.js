import { 
    LOGIN_SUCCESS
    , LOGIN_ERROR
    , LOGOUT_SUCCESS
} from './actionTypes';

import { AUTH_CONFIG } from '../../components/Auth/auth0-variables';
import authorize0 from 'auth0-js';

let accessToken = null;
let expiresAt = null;
const isBrowser = typeof window !== 'undefined';

let auth0 = isBrowser
    ? new authorize0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
}) : {};

// DISPATCHED ACTIONS
const loginSuccess = (profile) => {
    let payload = {
        isAuthenticated: true,
        profile: profile
    }
    return {
        type: LOGIN_SUCCESS
        ,payload: payload
    }
}

const logoutSuccess = () => {
    let payload = {
        isAuthenticated: false,
        error: ''
    }
    return {
        type: LOGOUT_SUCCESS,
        payload: payload
    }
}

const loginError = (error) => {
    let payload = {
        isAuthenticated: false,
        error: error
    }
    return {
        type: LOGIN_ERROR
        ,payload: payload
    }
}
  
// AUTHORIZES THE AUTH0 PROFILE
export const login = () => {
    if (!isBrowser) {
        return;
    }
    auth0.authorize();
}

// DETERMINES IF THE AUTH0 PROFILE IS VALID
export const handleAuthentication = () => {
    return dispatch => {
        if (!isBrowser) {
            return;
        }
        auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult, dispatch);
            } else if (err) {
                console.log(err);
                alert(`Error ${err.error}. Check console for further details.`);
            }
        });
    }
}

// SETS THE SESSION IF THE PROFILE IS VALID
const setSession = (authResult, dispatch) => {
    let currentExpiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    accessToken = authResult.accessToken;
    expiresAt = currentExpiresAt;
    if (!isBrowser) {
        return;
    }
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('expires_at', expiresAt);
    auth0.client.userInfo(accessToken, function(err, profile) {
        if(err) {
            dispatch(loginError(err));
        }
        dispatch(loginSuccess(profile));
    });  
}

// RENEWS THE SESSION WHEN THE USER RETURNS TO THE APPLICATION AND IF TOKEN IS NOT EXPIRED
export const renewSession = () => {
    return dispatch => {
        if (!isBrowser) {
            return;
        }
        auth0.checkSession({}, (err, authResult) => {
            console.log('renew session is running');
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult, dispatch);
            } else if (err) {
                logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }
}

// LOGS THE USER OUT, DESTROYS THE SESSION AND RELEASES THE AUTH0 CONNECTION
export const logout = () => {
    if (!isBrowser) {
        return;
    }
    auth0.logout({
        returnTo: 'https://www.thedevelopertoolbook.com',
        // returnTo: 'http://localhost:8000',
        clientID: AUTH_CONFIG.clientId
    });
    if (isBrowser) {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('expires_at');
      }
    return dispatch => {
        return dispatch(logoutSuccess());
    }
}