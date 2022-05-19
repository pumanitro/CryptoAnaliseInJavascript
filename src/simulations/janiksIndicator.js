import {fearAndGreedData} from "simulations/fearAndGreed";
import {convertToDate, vixData} from "simulations/vix";
import {realizedPriceData} from "simulations/realizedPrice";

export default {
    name: "JaniksIndicator",
    description: "Combo",
    simulation: ({ candles, buy, sell }) => {
        candles.forEach(candle => {
            // GREED & FEER
            const buyDatesFnG = fearAndGreedData.datasets[0].data.reduce((acc, value, index) => {
                // TODO: in previous simulation it was 9
                if(value <= 21) {
                    acc.push(new Date(fearAndGreedData.labels[index]));
                }

                return acc;
            }, []);


            const sellDatesFnG = fearAndGreedData.datasets[0].data.reduce((acc, value, index) => {
                if(value >= 95) {
                    acc.push(new Date(fearAndGreedData.labels[index]));
                }

                return acc;
            }, []);

            const buyDatesVix = vixData.reduce((acc, value, index) => {
                // TODO: in previous simulation it was 30
                if(Number(value[1]) >= 26) {
                    acc.push(convertToDate(value[0]));
                }

                return acc;
            }, []);


            const sellDatesVix = vixData.reduce((acc, value, index) => {
                if(Number(value[1]) <= 16) {
                    acc.push(convertToDate(value[0]));
                }

                return acc;
            }, []);

            const buyDatesJoin = buyDatesFnG.filter(date => buyDatesVix.find(dateVix => date.toDateString() === dateVix.toDateString()));
            const sellDatesJoin = sellDatesFnG.filter(date => sellDatesVix.find(dateVix => date.toDateString() === dateVix.toDateString()));

            const realizedPriceIndex = realizedPriceData.x.findIndex(date => (new Date(date)).toDateString() === candle.date.toDateString());
            const realizedPrice = realizedPriceData.y[realizedPriceIndex];

            // iterations could be optimised
            const shouldBuy = buyDatesJoin.find(date => date.toDateString() === candle.date.toDateString());
            if(shouldBuy && realizedPrice >= candle.close) {
                buy(candle, 0.0001);
            }

            const shouldSell = sellDatesJoin.find(date => date.toDateString() === candle.date.toDateString());
            if(shouldSell && realizedPrice * 3.75 <= candle.close) {
                sell(candle, 0.0001);
            }
        });
    }
};
