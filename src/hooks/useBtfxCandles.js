import { useState, useEffect, useRef } from "react";
import BtfxWSService from "services/BtfxWSService";
import { parseCandles, parseCandle, dateToTimeStamp } from "utils/BtfxUtils";
import _ from "lodash";

export default function useBtfxCandles() {
  let [candles, setCandles] = useState([]);

  let candlesRef = useRef(candles);
  candlesRef.current = candles;

  useEffect(() => {
    new BtfxWSService()
      .defineChannel({
        event: "subscribe",
        channel: "candles",
        key: "trade:1m:tBTCUSD"
      })
      .handleSnapshot(snapshot => setCandles(parseCandles(snapshot[1])))
      .handleUpdate(value => {
        if (value[1] !== "hb") {
          const parsedCandle = parseCandle(value[1]);

          const isNewCandleInCandles =
            _.find(
              candlesRef.current,
              candle =>
                dateToTimeStamp(parsedCandle.date) ===
                dateToTimeStamp(candle.date)
            ) !== undefined;

          if (!isNewCandleInCandles) {
            setCandles([...candlesRef.current, parsedCandle]);
          }
        } else {
          console.log(value);
        }
      })
      .subscribe();
  }, []);

  return [candles, () => {}];
}
