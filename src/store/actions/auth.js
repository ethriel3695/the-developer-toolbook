import { 
    LOGIN_SUCCESS
    , LOGIN_ERROR
    , LOGOUT_SUCCESS
} from './actionTypes';

import { AUTH_CONFIG } from '../../components/Auth/auth0-variables';
import authorize0 from 'auth0-js';

let accessToken = null;
let idToken = null;
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
        type: LOGIN_SUCCESS,
        payload: payload
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
        type: LOGIN_ERROR,
        payload: payload
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
                setSession(authResult);
                return true;
            } else if (err) {
                console.log(err);
                alert(`Error ${err.error}. Check console for further details.`);
                return false;
            } else {
                return dispatch(loginSuccess(""));
            }
        });
    }
}

// SETS THE SESSION IF THE PROFILE IS VALID
const setSession = (authResult) => {
    let currentExpiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    accessToken = authResult.accessToken;
    idToken = authResult.idToken;
    expiresAt = currentExpiresAt;
    if (!isBrowser) {
        return;
    }
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', expiresAt);
    auth0.client.userInfo(accessToken, function(err, profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
    if(err) {
        return dispatch => {
            return dispatch(loginError(err));
        }
    }
    return dispatch => {
        return dispatch(loginSuccess(profile));
    }
    })  
}

// RENEWS THE SESSION WHEN THE USER RETURNS TO THE APPLICATION AND IF TOKEN IS NOT EXPIRED
export const renewSession = () => {
    if (!isBrowser) {
        return;
    }
    auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            setSession(authResult);
        } else if (err) {
            logout();
            console.log(err);
            alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        }
    });
}

// LOGS THE USER OUT, DESTROYS THE SESSION AND RELEASES THE AUTH0 CONNECTION
export const logout = () => {
    auth0.logout({
        returnTo: 'https://www.thedevelopertoolbook.com',
        clientID: AUTH_CONFIG.clientId
    });
    if (isBrowser) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('profile');
      }
    return dispatch => {
        return dispatch(logoutSuccess());
    }
}