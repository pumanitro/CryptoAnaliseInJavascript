export default {
  name: "Test Simulation",
  description:
    "It buys, on 1/4 of the chart data, for all money CC and sell it all at 3/4",
  simulation: ({ candles, buy, sell }) => {
    buy(candles[Math.floor(candles.length / 4)], 100);
    sell(candles[Math.floor(candles.length / 4) * 3], 100);
  }
};
