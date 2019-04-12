import { 
    LOGIN_SUCCESS
    , LOGIN_ERROR
    , LOGOUT_SUCCESS
} from './actionTypes';

import { AUTH_CONFIG } from '../../components/Auth/auth0-variables';
import authorize0 from 'auth0-js';
import { navigate } from 'gatsby';

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

const loginSuccess = (profile) => {
    return {
        type: LOGIN_SUCCESS,
        isAuthenticated: true,
        profile: profile
    }
}

const loginError = (err) => {
    return {
        type: LOGIN_ERROR,
        isAuthenticated: false,
        error: err
    }
}
  
export const login = () => {
    if (!isBrowser) {
        return;
    }
    auth0.authorize();
}

export const handleAuthentication = () => {
    if (!isBrowser) {
        return;
    }
    auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            setSession(authResult);
            return true;
        } else if (err) {
            alert(`Error ${err.error}. Check console for further details.`);
            return false;
        } else {
            return loginSuccess("");
        }
    });
}

const setSession = (authResult) => {
    let currentExpiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    accessToken = authResult.accessToken;
    idToken = authResult.idToken;
    expiresAt = currentExpiresAt;
    if (!isBrowser) {
        return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', expiresAt);
    auth0.client.userInfo(accessToken, function(err, profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
    if(err) {
        return loginError(err);
    }
    navigate('/');
    return loginSuccess(profile);
    })
}

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

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
        isAuthenticated: false,
        error: ''
    }
}

export const logout = () => {
    auth0.logout({
        returnTo: 'http://localhost:8000',
        clientID: AUTH_CONFIG.clientId
    });
    if (isBrowser) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('profile');
      }
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('id_token');
    // localStorage.removeItem('expires_at');
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('profile');
    return dispatch => {
        return dispatch(logoutSuccess());
    }
}