import React, { useState } from "react";
import Select from "react-select";

const buy = candle => console.log("buy => ", candle);
const sell = candle => console.log("sell => ", candle);

export default ({ simulations, candles }) => {
  const [chosenSimulation, setChosenSimulation] = useState(undefined);
  const [startingCash, setStartingCash] = useState(1000);

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
      <div>{chosenSimulation && chosenSimulation.value.description}</div>
      <div>
        <label>Starting cash:</label>
        <input
          type="number"
          value={startingCash}
          onChange={e => setStartingCash(e.target.value)}
        />
        <span
          onClick={() =>
            chosenSimulation &&
            chosenSimulation.value.simulation({ candles, buy, sell })
          }
        >
          |> Run
        </span>
      </div>
    </>
  );
};
