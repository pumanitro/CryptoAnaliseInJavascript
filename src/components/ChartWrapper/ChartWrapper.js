import React from "react";

import Chart from "./Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";

export default ({ tradingSymbol }) => {
  const [candles, loadMoreCandles] = useBtfxCandles("1m", tradingSymbol);

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
