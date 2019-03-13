import React from "react";

import BtfxWSService from "services/BtfxWSService";

new BtfxWSService()
  .defineChannel({
    event: "subscribe",
    channel: "candles",
    key: "trade:1m:tBTCUSD"
  })
  .handleSnapshot(snapshot => console.log("Snapshot" + snapshot))
  .handleUpdate(value => console.log("Updated Value" + value))
  .subscribe();

export default () => <h1>CAJS</h1>;
