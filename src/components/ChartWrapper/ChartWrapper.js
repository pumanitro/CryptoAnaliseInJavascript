import React from "react";

import Chart from "./Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";
import SimulationWrapper from "./SimulationWrapper/SimulationWrapper";
import simulations from "simulations";
import { macd } from "react-stockcharts/lib/indicator";

export default ({ selectedSymbol, timeFrame }) => {
  const [candles, setCandles, loadMoreCandles] = useBtfxCandles(
    timeFrame,
    `t${selectedSymbol}`
  );

  const macdCalculator = macd()
    .options({
      fast: 12,
      slow: 26,
      signal: 9
    })
    .merge((d, c) => {
      d.macd = c;
    })
    .accessor(d => d.macd);

  const indicators = {
    macdCalculator
  };

  // Running all indicators:
  Object.values(indicators).forEach(indicator => indicator(candles));

  return (
    <>
      {!!candles.length ? (
        <>
          <Chart
            type="hybrid"
            data={candles}
            indicators={indicators}
            loadMoreCandles={loadMoreCandles}
          />
          <SimulationWrapper
            simulations={simulations}
            candles={candles}
            setCandles={setCandles}
            selectedSymbol={selectedSymbol}
          />
        </>
      ) : (
        <div> Loading ... </div>
      )}
    </>
  );
};
