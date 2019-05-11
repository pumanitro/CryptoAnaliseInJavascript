import React, { useEffect, useState } from "react";
import axios from "utils/axios";
import Select from "react-select";

export default ({ selectedSymbol, setSelectedSymbol }) => {
  const [cryptocurrencySymbols, setCryptocurrencySymbols] = useState([]);

  useEffect(() => {
    axios
      .get("/conf/pub:list:pair:exchange")
      .then(resp =>
        setCryptocurrencySymbols(
          resp.data[0].map(symbol => ({ label: symbol, value: symbol }))
        )
      );
  }, []);

  if (cryptocurrencySymbols.length === 0) {
    return <div>Loading ...</div>;
  }

  return (
    <Select
      value={selectedSymbol}
      onChange={setSelectedSymbol}
      styles={{ menu: base => ({ ...base, zIndex: 2 }) }}
      options={cryptocurrencySymbols}
    />
  );
};
