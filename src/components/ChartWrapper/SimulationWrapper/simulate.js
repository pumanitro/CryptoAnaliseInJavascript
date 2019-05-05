import SIMULATION from "consts/simulation";

export default ({ startingCash, simulationObject, candles, setCandles }) => {
  const buy = candle => {
    candle.action = SIMULATION.ACTION.BUY;

    // Refresh chart with mutated candles - faster than finding a candle and replacing it with a new one:
    setCandles([...candles]);
    console.log("buy => ", candle);
  };
  const sell = candle => {
    candle.action = SIMULATION.ACTION.SELL;

    // Refresh chart with mutated candles - faster than finding a candle and replacing it with a new one:
    setCandles([...candles]);
    console.log("sell => ", candle);
  };

  simulationObject.simulation({ candles, buy, sell });
};
