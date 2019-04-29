import React, { useState } from "react";
import ChartWrapper from "components/ChartWrapper/ChartWrapper";
import SymbolsDropdown from "components/SymbolsDropdown/SymbolsDropdown";

export default () => {
  const [selectedSymbol, setSelectedSymbol] = useState({
    value: "BTCUSD",
    label: "BTCUSD"
  });

  return (
    <div className="App">
      <h1>CAJS</h1>
      <ChartWrapper tradingSymbol={`t${selectedSymbol.value}`} />
      <SymbolsDropdown
        selectedSymbol={selectedSymbol}
        setSelectedSymbol={setSelectedSymbol}
      />
    </div>
  );
};
