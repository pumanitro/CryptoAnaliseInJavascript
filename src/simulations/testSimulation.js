export default {
  name: "Test Simulation",
  description:
    "It only buys, for all available money, CryptoCurrencies on the middle of loaded data.",
  simulation: ({ candles, buy, sell }) => {
    buy(candles[Math.floor(candles.length / 2)], 100);
  }
};
