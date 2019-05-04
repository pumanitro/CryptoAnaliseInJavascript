import React, { useState } from "react";
import Select from "react-select";

const buy = candle => console.log("buy => ", candle);
const sell = candle => console.log("sell => ", candle);

export default ({ simulations, candles }) => {
  const [chosenSimulation, setChosenSimulation] = useState(undefined);

  return (
    <>
      <Select
        value={chosenSimulation}
        placeholder="Choose simulation..."
        onChange={setChosenSimulation}
        options={simulations.map(simulation => ({
          value: simulation,
          label: simulation.name
        }))}
      />
      <div
        onClick={() =>
          chosenSimulation &&
          chosenSimulation.value.simulation({ candles, buy, sell })
        }
      >
        |> Run
      </div>
      <div>{chosenSimulation && chosenSimulation.value.description}</div>
    </>
  );
};
