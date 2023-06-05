import { fraction, add, number } from "mathjs";
import React, { useState } from "react";

let objectiveEquation = [fraction(3), fraction(2), "Max"];
let constrainEquations = [
  [fraction(0.3), fraction(2), fraction(14), "<="],
  [fraction(3), fraction(2), fraction(14.2), "<="],
  [fraction(1), fraction(-1), fraction(3), "<="],
];

const MatrixTable = ({ matrices }) => {
  return (
    <div>
      {matrices.map((matrix, index) => (
        <div key={index}>
          <h2>{matrix.title}</h2>
          <table>
            <thead>
              <tr>
                {matrix.table[0].map((value, index) => (
                  <th key={index}>{index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.table.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MatrixTable;
