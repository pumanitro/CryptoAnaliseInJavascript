import React from "react";

import { webSocket } from "rxjs/webSocket";
import { WEBSOCKET_API_URL } from "config/config";

const subject = webSocket(WEBSOCKET_API_URL);

subject.subscribe(
  msg => console.log("message received: " + JSON.stringify(msg)) // Called whenever there is a message from the server.
);

subject.next({
  event: "subscribe",
  channel: "candles",
  key: "trade:1m:tBTCUSD"
});

export default () => <h1>CAJS</h1>;
