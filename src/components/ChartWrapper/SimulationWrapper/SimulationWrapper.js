import React, { useState } from "react";
import Select from "react-select";

export default ({ simulations, candles }) => {
  const [chosenSimulation, setChosenSimulation] = useState(undefined);

  return (
    <>
      <Select
        value={chosenSimulation}
        placeholder="Choose simulation..."
        onChange={setChosenSimulation}
        options={simulations.map(simulation => ({
          value: simulation.simulation,
          label: simulation.name
        }))}
      />
      <div>|> Run </div>
    </>
  );
};
