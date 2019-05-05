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

export default ({ simulationResults }) => {
  return (
    <Table>
      <TableHeader>
        <TableHeaderEl>Cash</TableHeaderEl>
        <TableHeaderEl>Cryptocurrency</TableHeaderEl>
        <TableHeaderEl>Action</TableHeaderEl>
        <TableHeaderEl>Spent</TableHeaderEl>
        <TableHeaderEl>Cash After</TableHeaderEl>
        <TableHeaderEl>Cryptocurrency After</TableHeaderEl>
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
        </TableRow>
      ))}
    </Table>
  );
};
