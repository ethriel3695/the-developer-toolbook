import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

const isBrowser = typeof window !== 'undefined';
let isLoggedIn = true;
const loggedIn = () => {
  if (isBrowser) {
    if (localStorage.getItem('isLoggedIn')) {
      isLoggedIn = localStorage.getItem('isLoggedIn');
    };
  }
  if (isLoggedIn === 'true') {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  return isLoggedIn;
}

// const redirect = 'http://tools.spudnik.com';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  // isLoggedIn = loggedIn();
  isLoggedIn = true;
  if (!isLoggedIn && location.pathname !== `/`) {
    // If we’re not logged in, redirect to the home page.
    navigate('/');
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute;