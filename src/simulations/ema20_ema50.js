export default {
  name: "Ema20 Ema50",
  description:
    "It buys, on 1/4 of the chart data, for all money CC and sell it all at 3/4",
  simulation: ({ candles, buy, sell }) => {
    console.log(candles);
    buy(candles[Math.floor(candles.length / 4)], 100);
  }
};
