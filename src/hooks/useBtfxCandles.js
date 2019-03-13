import { useState, useEffect } from "react";
import BtfxWSService from "services/BtfxWSService";
import { parseCandles } from "utils/BtfxUtils";

export default function useBtfxCandles() {
  let [candles, setCandles] = useState([]);

  useEffect(() => {
    new BtfxWSService()
      .defineChannel({
        event: "subscribe",
        channel: "candles",
        key: "trade:1h:tBTCUSD"
      })
      .handleSnapshot(snapshot => setCandles(parseCandles(snapshot[1])))
      .handleUpdate(value => console.log("Updated Value" + value))
      .subscribe();
  }, []);

  return [candles, () => {}];
}
