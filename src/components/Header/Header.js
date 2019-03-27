import React from "react";

import Chart from "../Chart/Chart";
import useBtfxCandles from "hooks/useBtfxCandles";

export default () => {
  const [candles, loadMore] = useBtfxCandles("1m", "tBTCUSD");

  console.log(candles);

  return (
    <>
      <h1>CAJS</h1>
      {!!candles.length ? (
        <Chart type="hybrid" data={candles} />
      ) : (
        <div> Loading ... </div>
      )}
    </>
  );
};
