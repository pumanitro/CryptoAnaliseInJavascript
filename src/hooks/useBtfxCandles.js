import { useState, useEffect, useRef } from "react";
import BtfxWSService from "services/BtfxWSService";
import { parseCandles, parseCandle, dateToTimeStamp } from "utils/BtfxUtils";
import _ from "lodash";
import { replaceOrAddAtEnd } from "utils/Collections";
import BtfxRest from "services/BtfxRest";

export default function useBtfxCandles(timeFrame, symbol) {
  let [candles, setCandles] = useState([]);

  let candlesRef = useRef(candles);
  candlesRef.current = candles;

  useEffect(() => {
    new BtfxWSService()
      .defineChannel({
        event: "subscribe",
        channel: "candles",
        key: `trade:${timeFrame}:${symbol}`
      })
      .handleSnapshot(snapshot => setCandles(parseCandles(snapshot[1])))
      .handleUpdate(value => {
        if (value[1] !== "hb") {
          const parsedCandle = parseCandle(value[1]);

          setCandles(
            replaceOrAddAtEnd(
              candlesRef.current,
              candle =>
                dateToTimeStamp(parsedCandle.date) ===
                dateToTimeStamp(candle.date),
              parsedCandle
            )
          );
        } else {
          console.log(value);
        }
      })
      .subscribe();
  }, [timeFrame, symbol]);

  return [
    candles,
    () => {
      BtfxRest.getMoreCandles(timeFrame, symbol, candles[0]).then(
        newCandlesPackage => {
          const newCandles = parseCandles(newCandlesPackage);
          setCandles([...newCandles, ...candles]);
        }
      );
    }
  ];
}
