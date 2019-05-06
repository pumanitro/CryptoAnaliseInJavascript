import React, { useState } from "react";
import ChartWrapper from "components/ChartWrapper/ChartWrapper";
import SymbolsDropdown from "components/SymbolsDropdown/SymbolsDropdown";
import TimeFrameDropdown from "components/TimeFrameDropdown/TimeFrameDropdown";

export default () => {
  const [selectedSymbol, setSelectedSymbol] = useState({
    value: "BTCUSD",
    label: "BTCUSD"
  });

  const [selectedTimeFrame, setSelectedTimeFrame] = useState({
    value: "1m",
    label: "1m"
  });

  return (
    <div className="App">
      <h1>CAJS</h1>
      <ChartWrapper
        selectedSymbol={selectedSymbol.value}
        timeFrame={selectedTimeFrame.value}
      />
      <SymbolsDropdown
        selectedSymbol={selectedSymbol}
        setSelectedSymbol={setSelectedSymbol}
      />
      <TimeFrameDropdown
        selectedTimeFrame={selectedTimeFrame}
        setSelectedTimeFrame={setSelectedTimeFrame}
      />
    </div>
  );
};
