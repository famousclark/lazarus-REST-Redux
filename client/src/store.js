import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from './reducers';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

export const history = createHistory();
export const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const thunkWare = [thunk];
const routerWare = routerMiddleware(history);

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...thunkWare, routerWare, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
