import Auth from './Auth';

const auth = new Auth();

const { isAuthenticated } = auth;

console.log(isAuthenticated);

test('tests handle Auth', () => {
    expect(auth.handleAuthentication()).toBeTruthy;
});