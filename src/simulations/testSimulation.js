export default {
  name: "Test Simulation",
  description:
    "It only buy, for all available money, CryptoCurrencies on the middle of loaded data.",
  simulation: ({ candles, buy, sell }) => {
    buy(candles[candles.length / 2], 100);
  }
};
