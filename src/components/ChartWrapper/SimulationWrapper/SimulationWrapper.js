import React, { useState } from "react";
import Select from "react-select";
import simulate from "./simulate";
import SimulationResults from "./SimulationResults/SimulationResults";

export default ({ simulations, candles, setCandles, selectedSymbol }) => {
  const [chosenSimulation, setChosenSimulation] = useState(undefined);
  const [startingCash, setStartingCash] = useState(1000);
  const [simulationResults, setSimulationResults] = useState(undefined);

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
            setSimulationResults(
              simulate({
                startingCash,
                simulationObject: chosenSimulation.value,
                candles,
                setCandles,
                selectedSymbol
              })
            )
          }
        >
          |> Run
        </span>
        {simulationResults && (
          <SimulationResults
            simulationResults={simulationResults}
            startingCash={startingCash}
          />
        )}
      </div>
    </>
  );
};
