export const setTickers = tickers => ({
  type: "TICKERS",
  tickers
});

export const tickersReducer = (state = [], action) => {
  switch (action.type) {
    case "TICKERS":
      return action.tickers;
    default:
      return state;
  }
}
