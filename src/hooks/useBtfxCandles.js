import { useState, useEffect, useRef } from "react";
import BtfxWSService from "services/BtfxWSService";
import { parseCandles, parseCandle, dateToTimeStamp } from "utils/BtfxUtils";
import { replaceOrAddAtEnd } from "utils/Collections";
import BtfxRest from "services/BtfxRest";

export default function useBtfxCandles(timeFrame, symbol) {
  let [candles, setCandles] = useState([]);

  let currentRef = useRef({ candles, timeFrame, symbol });
  currentRef.current = { candles, timeFrame, symbol };

  useEffect(() => {
    setCandles([]);

    new BtfxWSService()
      .defineChannel({
        event: "subscribe",
        channel: "candles",
        key: `trade:${timeFrame}:${symbol}`
      })
      .handleSnapshot(snapshot => setCandles(parseCandles(snapshot[1])))
      .handleUpdate(value => {
        if (
          value[1] !== "hb" &&
          currentRef.current.timeFrame === timeFrame &&
          currentRef.current.symbol === symbol
        ) {
          const parsedCandle = parseCandle(value[1]);

          setCandles(
            replaceOrAddAtEnd(
              currentRef.current.candles,
              candle =>
                dateToTimeStamp(parsedCandle.date) ===
                dateToTimeStamp(candle.date),
              parsedCandle
            )
          );
        } else {
          // console.log(value);
        }
      })
      .subscribe();
  }, [timeFrame, symbol]);

  return [
    candles,
    setCandles,
    () =>
      BtfxRest.getMoreCandles(timeFrame, symbol, candles[0]).then(
        newCandlesPackage => {
          const retrievedCandles = parseCandles(newCandlesPackage);
          const newCandles = [...retrievedCandles, ...candles];
          setCandles(newCandles);
          return {
            retrievedCandlesLength: retrievedCandles.length
          };
        }
      )
  ];
}
