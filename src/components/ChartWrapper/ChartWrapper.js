import React, { useRef, useEffect } from "react";

import Chart from "./Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";
import SimulationWrapper from "./SimulationWrapper/SimulationWrapper";
import simulations from "simulations";
import { macd, ema } from "react-stockcharts/lib/indicator";

export default ({ selectedSymbol, timeFrame }) => {
  const [candles, setCandles, loadMoreCandles] = useBtfxCandles(
    timeFrame,
    `t${selectedSymbol}`
  );

  const ema12 = ema()
    .options({
      windowSize: 12, // optional will default to 10
      sourcePath: "close" // optional will default to close as the source
    })
    .skipUndefined(true) // defaults to true
    .merge((d, c) => {
      d.ema12 = c;
    }) // Required, if not provided, log a error
    .accessor(d => d.ema12) // Required, if not provided, log an error during calculation
    .stroke("blue");

  const ema26 = ema()
    .options({ windowSize: 26 })
    .merge((d, c) => {
      d.ema26 = c;
    })
    .accessor(d => d.ema26);

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
    macdCalculator,
    ema12,
    ema26
  };

  // Running all indicators:
  Object.values(indicators).forEach(indicator => indicator(candles));

  return (
    <>
      {!!candles.length ? (
        <>
          <div
            onMouseEnter={e =>
              (document.documentElement.style.overflow = "hidden")
            }
            onMouseLeave={e =>
              (document.documentElement.style.overflow = "auto")
            }
          >
            <Chart
              type="hybrid"
              data={candles}
              indicators={indicators}
              loadMoreCandles={loadMoreCandles}
            />
          </div>
          <h2>Simulation</h2>
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
