import React, { useState } from "react";
import ChartWrapper from "components/ChartWrapper/ChartWrapper";
import SymbolsDropdown from "components/SymbolsDropdown/SymbolsDropdown";
import TimeFrameDropdown from "components/TimeFrameDropdown/TimeFrameDropdown";

import styled from "styled-components";

const DropdownsWrapper = styled.div`
  display: flex;

  & > div {
    flex: 1;
  }
`;

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
      <h1>Crypto Analisis in JS</h1>
      <DropdownsWrapper>
        <SymbolsDropdown
          selectedSymbol={selectedSymbol}
          setSelectedSymbol={setSelectedSymbol}
        />
        <TimeFrameDropdown
          selectedTimeFrame={selectedTimeFrame}
          setSelectedTimeFrame={setSelectedTimeFrame}
        />
      </DropdownsWrapper>
      <ChartWrapper
        selectedSymbol={selectedSymbol.value}
        timeFrame={selectedTimeFrame.value}
      />
    </div>
  );
};
