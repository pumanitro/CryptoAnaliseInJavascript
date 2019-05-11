import _ from "lodash";
import SIMULATION from "consts/simulation";

export default {
  name: "Macd",
  description: "It buys when MACD cross 0 and is positive, otherwise it sells.",
  simulation: ({ candles, buy, sell }) => {
    // finding first defined MACD:
    let lastAction =
      _.find(candles, candle => candle.macd.macd !== undefined) >= 0
        ? SIMULATION.ACTION.BUY
        : SIMULATION.ACTION.SELL;

    candles.forEach(candle => {
      if (lastAction === SIMULATION.ACTION.BUY && candle.macd.macd < 0) {
        sell(candle, 100);
        lastAction = SIMULATION.ACTION.SELL;
      } else if (
        lastAction === SIMULATION.ACTION.SELL &&
        candle.macd.macd >= 0
      ) {
        buy(candle, 100);
        lastAction = SIMULATION.ACTION.BUY;
      }
    });
  }
};
