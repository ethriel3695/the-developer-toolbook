import { createStore as reduxCreateStore
  , applyMiddleware, combineReducers, compose } from "redux";
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './reducers/auth';
const isBrowser = typeof window !== 'undefined';

let composeEnhancers = null;
if (isBrowser) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

const rootReducer = combineReducers({
  auth: auth
});

// let composeEnhancers = compose;

const createStore = () => {
  // return reduxCreateStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return reduxCreateStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default createStore;