import axios from "utils/axios";
import { dateToTimeStamp, timeFrameToMS } from "utils/BtfxUtils";

class BtfxRest {
  MAX_CANDLES_AMOUNT = 1000;

  getCandles = (timeFrame, symbol, dateStart, dateEnd) => {
    // 1388534400000

    return axios
      .get(
        `candles/trade:${timeFrame}:${symbol}/hist?start=${dateToTimeStamp(
          dateStart
        )}&end=${dateToTimeStamp(dateEnd)}&limit=${this.MAX_CANDLES_AMOUNT}`
      )
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        console.warn(err);
      });
  };

  getMoreCandles = (timeFrame, symbol, lastCandle) => {
    const end = lastCandle.date;

    const start = new Date(
      end - timeFrameToMS(timeFrame) * this.MAX_CANDLES_AMOUNT
    );

    return this.getCandles(timeFrame, symbol, start, end);
  };
}

export default new BtfxRest();
