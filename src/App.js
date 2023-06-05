import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TableComponent from "./TableComponent";
function App() {
  let objectiveEquation = [1, 1, 1, 1, 1, 1, 1, 1, 1, "Max"];
  let constrainEquations = [
    [0.3, 0.1, 0.2, 0, 0, 0, 0, 0, 0, 50, "<="],
    [0, 0, 0, 0.5, 0.2, 0.4, 0, 0, 0, 60, "<="],
    [0, 0, 0, 0, 0, 0, 0.4, 0.5, 0.3, 40, "<="],
  ];

  const mystyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ margin: "50px 0px 0px 50px" }}>Курсова робота</h1>
        <div style={mystyle}>
          <TableComponent />
        </div>
      </header>
    </div>
  );
}

export default App;
