export function parseCandle(candle) {
  return {
    date: new Date(candle[0]),
    open: candle[1],
    close: candle[2],
    high: candle[3],
    low: candle[4],
    volume: candle[5]
  };
}

export function parseCandles(candles) {
  return candles.reverse().map(candle => parseCandle(candle));
}

export function dateToTimeStamp(date) {
  return Math.floor(date / 1);
}

export function timeFrameToMS(timeFrame) {
  let secondMultiplier;

  switch (timeFrame[timeFrame.length - 1]) {
    case "m":
      secondMultiplier = 60;
      break;
    case "h":
      secondMultiplier = 60 * 60;
      break;
    case "D":
      secondMultiplier = 60 * 60 * 12;
      break;
    case "M":
      secondMultiplier = 60 * 60 * 12 * 29;
      break;
    default:
      throw "You need to set time frame with m/h/D/M sings at the end";
  }

  const times = +timeFrame.substring(0, timeFrame.length - 1);

  return secondMultiplier * 1000 * times;
}
