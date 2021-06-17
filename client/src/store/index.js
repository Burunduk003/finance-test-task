import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { tickersReducer } from './tickers'

const rootReducer = combineReducers({
  tickers: tickersReducer,
});

export const getState = (state) => state;

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;
