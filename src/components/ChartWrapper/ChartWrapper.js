import React from "react";

import Chart from "./Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";
import SimulationWrapper from "./SimulationWrapper/SimulationWrapper";
import simulations from "simulations";
import { ema } from "react-stockcharts/lib/indicator";

export default ({ selectedSymbol, timeFrame }) => {
  const [candles, setCandles, loadMoreCandles] = useBtfxCandles(
    timeFrame,
    `t${selectedSymbol}`
  );

  const ema20 = ema()
    .options({
      windowSize: 20, // optional will default to 10
      sourcePath: "close" // optional will default to close as the source
    })
    .skipUndefined(true) // defaults to true
    .merge((d, c) => {
      d.ema20 = c;
    }) // Required, if not provided, log a error
    .accessor(d => d.ema20) // Required, if not provided, log an error during calculation
    .stroke("blue");

  const ema50 = ema()
    .options({ windowSize: 50 })
    .merge((d, c) => {
      d.ema50 = c;
    })
    .accessor(d => d.ema50);

  const indicators = {
    ema20,
    ema50
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
