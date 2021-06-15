import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const setTickers = tickers => ({
  type: "TICKERS",
  tickers
});

const tickersReducer = (state = [], action) => {
  switch (action.type) {
    case "TICKERS":
      return action.tickers;
    default:
      return state;
  }
}

export const getTickers = (state) => state;

const store = createStore(tickersReducer, applyMiddleware(thunk));

export default store;
