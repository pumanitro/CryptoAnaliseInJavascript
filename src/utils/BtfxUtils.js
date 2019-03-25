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
