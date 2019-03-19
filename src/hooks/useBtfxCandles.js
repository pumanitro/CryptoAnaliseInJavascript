import { useState, useEffect } from "react";
import BtfxWSService from "services/BtfxWSService";
import { parseCandles, parseCandle } from "utils/BtfxUtils";
import _ from "lodash";

export default function useBtfxCandles() {
  let [candles, setCandles] = useState([]);

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
          console.log(parseCandle(value[1]));
          console.log(
            _.find(candles, candle => {
              console.log(
                parseCandle(value[1]).date.toString() === candle.date.toString()
              );
              return (
                parseCandle(value[1]).date.toString() === candle.date.toString()
              );
            })
          );
        } else {
          console.log(value);
        }
      })
      .subscribe();
  }, []);

  return [candles, () => {}];
}
