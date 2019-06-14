let callbackUrl = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    callbackUrl = 'http://localhost:8000/callback';
} else {
    callbackUrl = 'https://www.thedevelopertoolbook.com/callback';
}


export const AUTH_CONFIG = {
    domain: 'devellistech.auth0.com',
    clientId: 'HeKKgZWsqsHxcPYSs46pB09U06JA4ySN',
    callbackUrl: callbackUrl 
}