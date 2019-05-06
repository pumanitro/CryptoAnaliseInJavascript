class Consts {
  // '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '7D', '14D', '1M'
  timeFrame = {
    m1: "1m",
    m5: "5m",
    m15: "15m",
    m30: "30m",
    h1: "1h",
    h3: "3h",
    h6: "6h",
    h12: "12h",
    D1: "1D",
    D7: "7D",
    D14: "14D",
    M1: "1M"
  };

  symbol = {
    BTCUSD: "BTCUSD"
  };

  fees = {
    TAKER: 0.2 / 100,
    MAKER: 0.1 / 100
  };
}

export default new Consts();
