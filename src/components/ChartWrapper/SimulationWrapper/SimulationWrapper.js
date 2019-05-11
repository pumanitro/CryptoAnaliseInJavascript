import React, { useState } from "react";
import Select from "react-select";
import simulate from "./simulate";
import SimulationResults from "./SimulationResults/SimulationResults";

import styled from "styled-components";

const SimulationMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SimulationDescription = styled.div`
  margin-top: 10px;
`;

export default ({ simulations, candles, setCandles, selectedSymbol }) => {
  const [chosenSimulation, setChosenSimulation] = useState(undefined);
  const [startingCash, setStartingCash] = useState(1000);
  const [simulationResults, setSimulationResults] = useState(undefined);

  return (
    <>
      <SimulationMenuWrapper>
        <div>
          <label>Starting cash </label>
          <input
            type="number"
            value={startingCash}
            onChange={e => setStartingCash(e.target.value)}
          />
        </div>
        <button
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
        </button>
      </SimulationMenuWrapper>
      <Select
        value={chosenSimulation}
        placeholder="Choose simulation..."
        onChange={setChosenSimulation}
        options={simulations.map(simulation => ({
          value: simulation,
          label: simulation.name
        }))}
      />
      <SimulationDescription>
        {chosenSimulation && chosenSimulation.value.description}
      </SimulationDescription>
      {simulationResults && (
        <SimulationResults
          simulationResults={simulationResults}
          startingCash={startingCash}
        />
      )}
    </>
  );
};
