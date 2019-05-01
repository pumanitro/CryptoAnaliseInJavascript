import React from "react";

import Chart from "./Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";

export default ({ tradingSymbol, timeFrame }) => {
  const [candles, loadMoreCandles] = useBtfxCandles(timeFrame, tradingSymbol);

  return (
    <>
      {!!candles.length ? (
        <Chart type="hybrid" data={candles} loadMoreCandles={loadMoreCandles} />
      ) : (
        <div> Loading ... </div>
      )}
    </>
  );
};
