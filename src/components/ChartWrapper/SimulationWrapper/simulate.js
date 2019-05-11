import SIMULATION from "consts/simulation";
import BtfxConsts from "consts/BtfxConsts";

const resetCandlesActions = candles => {
  candles.forEach(candle => (candle.action = undefined));
};

export default ({
  startingCash,
  simulationObject,
  candles,
  setCandles,
  selectedSymbol
}) => {
  resetCandlesActions(candles);

  const summaryData = [];
  let yourCash = startingCash;
  // todo: add feature to change base cryptocurrency status:
  let yourCrypto = 0;

  const buy = (candle, percentageAmount) => {
    if (percentageAmount > 100) {
      throw new Error("Percentage amount can't be bigger than 100%.");
    }

    if (yourCash <= 0) {
      console.warn("You can't buy if your cash amount is equal or less than 0");
      return null;
    }

    const cashForAction = (yourCash * percentageAmount) / 100;
    const averageCryptoPrize = (candle.low + candle.high) / 2;

    const fees = cashForAction * BtfxConsts.fees.MAKER;

    const yourCashAfter = yourCash - cashForAction - fees;

    const yourCryptoAfter = cashForAction / averageCryptoPrize;

    summaryData.push({
      yourCash,
      yourCrypto,
      action: SIMULATION.ACTION.BUY,
      spent: percentageAmount,
      feesInCash: fees,
      after: {
        yourCash: yourCashAfter,
        yourCrypto: yourCryptoAfter,
        total: yourCashAfter + yourCryptoAfter * averageCryptoPrize
      }
    });

    yourCash = yourCashAfter;
    yourCrypto = yourCryptoAfter;

    candle.action = SIMULATION.ACTION.BUY;

    // Refresh chart with mutated candles - faster than finding a candle and replacing it with a new one:
    setCandles([...candles]);

    // console.log("buy => ", candle);
    // console.log("summaryData = ", summaryData);
  };
  const sell = (candle, percentageAmount) => {
    if (percentageAmount > 100) {
      throw new Error("Percentage amount can be bigger than 100%.");
    }

    if (yourCrypto <= 0) {
      console.warn(
        "You can't sell if your crypto amount is equal or less than 0"
      );
      return null;
    }

    const cryptoForAction = (yourCrypto * percentageAmount) / 100;
    const averageCryptoPrize = (candle.low + candle.high) / 2;

    const fees = cryptoForAction * BtfxConsts.fees.TAKER;

    const yourCashAfter = yourCash + cryptoForAction * averageCryptoPrize;

    const yourCryptoAfter = yourCrypto - cryptoForAction - fees;

    summaryData.push({
      yourCash,
      yourCrypto,
      action: SIMULATION.ACTION.SELL,
      spent: percentageAmount,
      feesInCash: fees * averageCryptoPrize,
      after: {
        yourCash: yourCashAfter,
        yourCrypto: yourCryptoAfter,
        total: yourCashAfter + yourCryptoAfter * averageCryptoPrize
      }
    });

    yourCash = yourCashAfter;
    yourCrypto = yourCryptoAfter;

    candle.action = SIMULATION.ACTION.SELL;

    // Refresh chart with mutated candles - faster than finding a candle and replacing it with a new one:
    setCandles([...candles]);

    // console.log("sell => ", candle);
    // console.log("summaryData = ", summaryData);
  };

  simulationObject.simulation({ candles, buy, sell });

  return summaryData;
};
