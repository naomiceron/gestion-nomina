import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import appReducer from './containers/App/reducer';
import loadHandlerReducer from './hoc/withLoadHandler/reducer';
import messageHandlerReducer from './hoc/withMessageHandler/reducer';
import thunk from 'redux-thunk';
  
  
  const rootReducer = combineReducers({
    app: appReducer,
    messageHandler: messageHandlerReducer,
    loadHandler: loadHandlerReducer
  });
  
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  export default createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  );