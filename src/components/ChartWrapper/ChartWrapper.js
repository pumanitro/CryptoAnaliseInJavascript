import React from "react";

import Chart from "../Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";

export default () => {
  const [candles, loadMoreCandles] = useBtfxCandles("1m", "tBTCUSD");

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
