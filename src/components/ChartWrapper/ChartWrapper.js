import React from "react";

import Chart from "./Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";
import SimulationWrapper from "./SimulationWrapper/SimulationWrapper";
import simulations from "simulations";

export default ({ tradingSymbol, timeFrame }) => {
  const [candles, loadMoreCandles] = useBtfxCandles(timeFrame, tradingSymbol);

  return (
    <>
      {!!candles.length ? (
        <>
          <Chart
            type="hybrid"
            data={candles}
            loadMoreCandles={loadMoreCandles}
          />
          <SimulationWrapper simulations={simulations} candles={candles} />
        </>
      ) : (
        <div> Loading ... </div>
      )}
    </>
  );
};
