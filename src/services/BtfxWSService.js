import { webSocket } from "rxjs/webSocket";
import { map } from "rxjs/operators";

export default class BtfxWEService {
  constructor() {
    this.channelDefinition = null;
    this.snapshotHandler = null;
    this.updateHandler = null;

    this.WEBSOCKET_API_URL = "wss://api.bitfinex.com/ws/2";

    this.subject = webSocket(this.WEBSOCKET_API_URL);
  }

  defineChannel = channelDefinition => {
    this.channelDefinition = channelDefinition;
    return this;
  };

  handleSnapshot = snapshotHandler => {
    this.snapshotHandler = snapshotHandler;
    return this;
  };

  handleUpdate = updateHandler => {
    this.updateHandler = updateHandler;
    return this;
  };

  subscribe = () => {
    if (
      !this.channelDefinition ||
      !this.snapshotHandler ||
      !this.updateHandler
    ) {
      console.error(
        "Channel or SnapshotHandler or UpdateHandler is not defined. Define it to subscribe to BtfxWSService."
      );
      return null;
    }

    this.subject
      .pipe(
        map((value, index) => ({
          value,
          index
        }))
      )
      .subscribe(({ value, index }) => {
        if (index === 2) {
          this.snapshotHandler(value);
        } else if (index >= 3) {
          this.updateHandler(value);
        }
      });

    this.subject.next(this.channelDefinition);
  };
}
