import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './authReducers';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLs = new SecureLS();
const getStateFromStorage = () => {
  const citybikeAuth = secureLs.get('citybike-auth');
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  };
  if (citybikeAuth) return citybikeAuth;
  return stateInLocalStorage;
};

const updatestateInStorage = (newState) => {
  secureLs.set('citybike-auth', newState);
};

// https://github.com/zalmoxisus/redux-devtools-extension#usage
const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    authReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    updatestateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });
  return store;
};

export default configureStore;
