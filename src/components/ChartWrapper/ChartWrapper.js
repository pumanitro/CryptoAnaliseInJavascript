import React from "react";

import Chart from "./Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";
import SimulationWrapper from "./SimulationWrapper/SimulationWrapper";
import simulations from "simulations";

export default ({ selectedSymbol, timeFrame }) => {
  const [candles, setCandles, loadMoreCandles] = useBtfxCandles(
    timeFrame,
    `t${selectedSymbol}`
  );

  return (
    <>
      {!!candles.length ? (
        <>
          <Chart
            type="hybrid"
            data={candles}
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
