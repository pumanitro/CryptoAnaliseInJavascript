import React from "react";
import styled from "styled-components";
import SIMULATION from "consts/simulation";

const Table = styled.div`
  margin: 20px 0px;
`;

const TableHeader = styled.div`
  display: flex;
`;

const TableHeaderEl = styled.div`
  width: 100%;
  border: 1px solid black;
`;

const TableRow = styled.div`
  display: flex;
  background-color: ${props =>
    props.action === SIMULATION.ACTION.BUY ? "#99de99" : "#ff7a7a"};
`;

const TableRowEl = styled.div`
  width: 100%;
  border: 1px solid black;
`;

const calculatePercentageBilans = (lastSimulationResult, startingCash) => {
  const percentageBilans =
    (lastSimulationResult.after.total / startingCash) * 100;

  if (percentageBilans > 100) {
    return `+${Number(percentageBilans - 100).toFixed(4)}%`;
  } else {
    return `-${Number(100 - percentageBilans).toFixed(4)}%`;
  }
};

export default ({ simulationResults, startingCash }) => {
  const lastSimulationResult = simulationResults[simulationResults.length - 1];

  return (
    <>
      <h3>Summary table:</h3>
      <Table>
        <TableHeader>
          <TableHeaderEl>Cash</TableHeaderEl>
          <TableHeaderEl>Cryptocurrency</TableHeaderEl>
          <TableHeaderEl>Action</TableHeaderEl>
          <TableHeaderEl>Spent</TableHeaderEl>
          <TableHeaderEl>Cash After</TableHeaderEl>
          <TableHeaderEl>Cryptocurrency After</TableHeaderEl>
          <TableHeaderEl>Total After</TableHeaderEl>
        </TableHeader>
        {simulationResults.map((simulationResult, i) => (
          <TableRow key={i} action={simulationResult.action}>
            <TableRowEl>
              {Number(simulationResult.yourCash).toFixed(2)}
            </TableRowEl>
            <TableRowEl>
              {Number(simulationResult.yourCrypto).toFixed(8)}
            </TableRowEl>
            <TableRowEl>{simulationResult.action}</TableRowEl>
            <TableRowEl>{simulationResult.spent}%</TableRowEl>
            <TableRowEl>
              {Number(simulationResult.after.yourCash).toFixed(2)}
            </TableRowEl>
            <TableRowEl>
              {Number(simulationResult.after.yourCrypto).toFixed(8)}
            </TableRowEl>
            <TableRowEl>
              {Number(simulationResult.after.total).toFixed(2)}
            </TableRowEl>
          </TableRow>
        ))}
      </Table>
      <h4>{`You had ${startingCash} cash for start.`}</h4>
      <h4>{`After simulation you have ${lastSimulationResult.after.total}`}</h4>
      <h4>{`It is ${calculatePercentageBilans(
        lastSimulationResult,
        startingCash
      )}`}</h4>
    </>
  );
};
