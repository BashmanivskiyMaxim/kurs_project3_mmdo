import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { fraction, format, isInteger } from "mathjs";

const TableComponent = () => {
  const [matrices, setMatrices] = useState([]);
  const [matricesGomori, setMatricesGomori] = useState([]);

  let objectiveEquation = [1, 1, 1, 1, 1, 1, 1, 1, 1, "Max"];
  let constrainEquations = [
    [0.3, 0.1, 0.2, 0, 0, 0, 0, 0, 0, 50, "<="],
    [0, 0, 0, 0.5, 0.2, 0.4, 0, 0, 0, 60, "<="],
    [0, 0, 0, 0, 0, 0, 0.4, 0.5, 0.3, 40, "<="],
  ];

  function convertConsoleTableToHTML(
    tableData,
    zjHTML,
    keyCHTML,
    keyRHTML,
    keyElementHTML,
    solved,
    zjElem
  ) {
    var tableHtml =
      "<table style='border-collapse: collapse; width: 100%;  margin: 20px'>";
    tableHtml += "<tr style='background-color: #f2f2f2;'>";

    for (var i = 0; i < tableData.length; i++) {
      for (var header in tableData[i]) {
        tableHtml +=
          "<th style='border: 1px solid black; padding: 8px;'>" +
          header +
          "</th>";
      }
      break;
    }
    tableHtml += "</tr>";

    for (var i = 0; i < tableData.length; i++) {
      tableHtml +=
        "<tr style='background-color: " +
        (i % 2 === 0 ? "#f9f9f9" : "#ffffff") +
        ";'>";
      for (var header in tableData[i]) {
        tableHtml +=
          "<td style='border: 1px solid black; padding: 8px;'>" +
          tableData[i][header] +
          "</td>";
      }
      tableHtml += "</tr>";
    }

    tableHtml += "</table>";

    tableHtml +=
      "<table style='border-collapse: collapse; width: 100%; margin-top: 20px'>";
    tableHtml += "<tr><th>Індексний рядок</th></tr>";
    tableHtml += "<tr>";
    tableHtml +=
      "<td style='border: 1px solid black; padding: 8px;'>" +
      format(zjElem, { fraction: "ratio" }) +
      "</td>";
    for (var i = 0; i < zjHTML.length; i++) {
      tableHtml +=
        "<td style='border: 1px solid black; padding: 8px;'>" +
        format(zjHTML[i], { fraction: "ratio" }) +
        "</td>";
    }
    tableHtml += "</tr>";
    tableHtml += "</table>";

    // Додаємо значення після таблиці
    tableHtml += "<p>" + solved + "</p>";
    tableHtml += "<p>" + keyCHTML + "</p>";
    tableHtml += "<p>" + keyRHTML + "</p>";
    tableHtml += "<p>" + keyElementHTML + "</p>";

    return tableHtml;
  }

  function convertConsoleTableToHTMLGomori(
    tableData,
    zjHTML,
    keyCHTML,
    keyRHTML,
    keyElementHTML,
    solved,
    zjElem
  ) {
    var tableHtml =
      "<table style='border-collapse: collapse; width: 100%;  margin: 20px'>";
    tableHtml += "<tr style='background-color: #f2f2f2;'>";

    for (var i = 0; i < tableData.length; i++) {
      for (var header in tableData[i]) {
        tableHtml +=
          "<th style='border: 1px solid black; padding: 8px;'>" +
          header +
          "</th>";
      }
      break; // Беремо тільки перший рядок як заголовок
    }
    tableHtml += "</tr>";

    // Створюємо рядки таблиці
    for (var i = 0; i < tableData.length; i++) {
      tableHtml +=
        "<tr style='background-color: " +
        (i % 2 === 0 ? "#f9f9f9" : "#ffffff") +
        ";'>";
      for (var header in tableData[i]) {
        tableHtml +=
          "<td style='border: 1px solid black; padding: 8px;'>" +
          tableData[i][header] +
          "</td>";
      }
      tableHtml += "</tr>";
    }

    tableHtml += "</table>";

    // Виводимо значення масиву zjHTML з елементом zjElem
    tableHtml +=
      "<table style='border-collapse: collapse; width: 100%; margin-top: 20px'>";
    tableHtml += "<tr><th>θ</th></tr>";
    tableHtml += "<tr>";
    tableHtml +=
      "<td style='border: 1px solid black; padding: 8px;'>" +
      format(zjElem, { fraction: "ratio" }) +
      "</td>";
    for (var i = 0; i < zjHTML.length; i++) {
      tableHtml +=
        "<td style='border: 1px solid black; padding: 8px;'>" +
        format(zjHTML[i], { fraction: "ratio" }) +
        "</td>";
    }
    tableHtml += "</tr>";
    tableHtml += "</table>";

    // Додаємо значення після таблиці
    tableHtml += "<p>" + solved + "</p>";
    tableHtml += "<p>" + keyCHTML + "</p>";
    tableHtml += "<p>" + keyRHTML + "</p>";
    tableHtml += "<p>" + keyElementHTML + "</p>";

    return tableHtml;
  }

  function SimplexGomori(objectiveEquation, constrainEquations) {
    let table = [];
    const cj = fraction(
      objectiveEquation.slice(0, objectiveEquation.length - 1)
    );
    for (let i = 0; i < constrainEquations.length; ++i) {
      cj.push(0);
    }
    console.log("CJ", cj);
    let cjHTML = `CJ - ${cj}`;
    console.log("\nTable:1");
    constrainEquations.map((equation, index) => {
      let temp = [0];
      temp.push("x");
      temp.push(
        format(fraction(equation[equation.length - 2]), { fraction: "ratio" })
      );
      for (let i = 0; i < equation.length - 2; ++i)
        temp.push(format(fraction(equation[i]), { fraction: "ratio" }));

      for (let i = 0; i < constrainEquations.length; ++i) {
        if (index === i) {
          temp.push(fraction(1));
          continue;
        }
        temp.push(format(fraction(0), { fraction: "ratio" }));
      }

      table.push(temp);
    });

    let maxItr = 2;
    let html_res = [];
    for (let itr = 0; itr < maxItr; ++itr) {
      console.log(`\nTable:${itr + 1}`);

      let title = `Table:${itr + 1}`;

      let zj = new Array(table[0].length - 2).fill(0);

      table.map((data, index) => {
        for (let j = 2; j < data.length; ++j) {
          zj[j - 2] = fraction(
            zj[j - 2] + fraction(data[j]) * fraction(data[0])
          );
        }
      });
      let zj_cj = [];

      for (let j = 0; j < cj.length; ++j) {
        zj_cj.push(fraction(zj[j + 1] - cj[j]));
      }

      console.log("zj", zj);
      let zjElem = zj[0];
      let zjcjHTML = zj_cj;
      console.log("zj-cj", zj_cj);

      let keyCol = 3;

      let keyColArr = [];

      let keyIndex = 0;
      for (let i = 3; i < table[3].length; i++) {
        if (fraction(zj_cj[keyIndex]) == 0 || fraction(table[3][i]) == 0) {
          keyColArr[keyIndex] = 9999;
          keyIndex++;
        } else {
          keyColArr[keyIndex] =
            fraction(zj_cj[keyIndex]) / fraction(table[3][i]);
          keyIndex++;
        }
      }
      keyCol = keyColArr.indexOf(Math.min(...keyColArr)) + 3;

      console.log("Key Column:", keyCol + 1);
      let keyCHTML = `Ключовий стовбчик: ${keyCol + 1}`;

      let keyRow = table.length - 1;

      console.log("Key row:", keyRow + 1);
      let keyRHTML = `Ключовий рядок: ${keyRow + 1}`;

      let keyElementHTML = `Ключовий елемент: ${table[keyRow][keyCol]}`;

      let eqnSolved = false;
      let solved = "Розвязок оптимальний! Отримані цілі значення";

      for (var i = 0; i < table.length; i++) {
        if (!isInteger(fraction(table[i][2]))) {
          eqnSolved = true;
          solved = "Отримані не цілі значення!";

          break;
        }
      }

      if (eqnSolved == true) {
        html_res.push(
          convertConsoleTableToHTMLGomori(
            table,
            zjcjHTML,
            keyCHTML,
            keyRHTML,
            keyElementHTML,
            solved,
            zjElem
          )
        );
      } else {
        html_res.push(
          convertConsoleTableToHTMLGomori(
            table,
            zjcjHTML,
            (keyCHTML = ""),
            (keyRHTML = ""),
            (keyElementHTML = ""),
            solved,
            zjElem
          )
        );
      }

      simplifyTable(keyRow, keyCol);
      console.table(table);
    }

    function simplifyTable(keyRow, keyCol) {
      const keyElement = table[keyRow][keyCol];
      console.log("Key Element:", keyElement);
      for (let i = 2; i < table[keyRow].length; i++) {
        table[keyRow][i] = format(
          fraction(fraction(table[keyRow][i]) / fraction(keyElement)),
          { fraction: "ratio" }
        );
      }

      table.map((data, i) => {
        if (i !== keyRow) {
          let cnst = fraction(data[keyCol]);
          for (let j = 2; j < data.length; ++j) {
            table[i][j] = format(
              fraction(
                fraction(table[i][j]) - cnst * fraction(table[keyRow][j])
              ),
              { fraction: "ratio" }
            );
          }
        }
      });

      table[keyRow][0] = format(cj[keyCol - 3], { fraction: "ratio" });
      table[keyRow][1] =
        keyCol - 2 <= cj.length - constrainEquations.length
          ? `x${keyCol - 2}`
          : `s${keyCol - constrainEquations[0].length}`;
    }
    setMatricesGomori(html_res);
    return html_res;
  }

  function Simplex(objectiveEquation, constrainEquations, flag) {
    let zj_cj_glob;
    let table = [];
    const cj = fraction(
      objectiveEquation.slice(0, objectiveEquation.length - 1)
    );
    for (let i = 0; i < constrainEquations.length; ++i) {
      cj.push(0);
    }
    console.log("CJ", cj);
    let cjHTML = `CJ - ${cj}`;
    console.log("\nTable:1");
    constrainEquations.map((equation, index) => {
      let temp = [0];
      temp.push("s" + (index + 1));
      temp.push(fraction(equation[equation.length - 2]));
      for (let i = 0; i < equation.length - 2; ++i)
        temp.push(format(fraction(equation[i]), { fraction: "ratio" }));

      for (let i = 0; i < constrainEquations.length; ++i) {
        if (index === i) {
          temp.push(fraction(1));
          continue;
        }
        temp.push(fraction(0));
      }

      table.push(temp);
    });

    let maxItr = 30;
    let html_res = [];
    for (let itr = 0; itr < maxItr; ++itr) {
      console.log(`\nTable:${itr + 1}`);

      let title = `Table:${itr + 1}`;

      //console.log(table);
      //console.table(table)
      console.table(table);
      //console.log(html_res);

      let zj = new Array(table[0].length - 2).fill(0);

      table.map((data, index) => {
        for (let j = 2; j < data.length; ++j) {
          zj[j - 2] = fraction(
            zj[j - 2] + fraction(data[j]) * fraction(data[0])
          );
        }
      });
      let zj_cj = [];

      for (let j = 0; j < cj.length; ++j) {
        zj_cj.push(fraction(zj[j + 1] - cj[j]));
      }

      console.log("zj", zj);
      let zjElem = zj[0];
      let zjcjHTML = zj_cj;
      zj_cj_glob = zj_cj;
      console.log("zj-cj", zj_cj);

      let keyCol = 3;
      let eqnSolved = zj_cj[0] < 0 ? false : true;

      zj_cj.map((num, index) => {
        if (num < zj_cj[keyCol - 3] && num < 0) {
          keyCol = index + 3;
          eqnSolved = false;
        }
      });

      console.log("Key Column:", keyCol + 1);
      let keyCHTML = `Ключовий стовбчик: ${keyCol + 1}`;

      let solved = "Індексний рядок має відємні елменти!";

      if (eqnSolved !== false) {
        solved = "Розвязок оптимальний!";
        html_res.push(
          convertConsoleTableToHTML(
            table,
            zjcjHTML,
            `Fmax = ${format(fraction(zj[0]), { fraction: "ratio" })}`,
            ``,
            ``,
            solved,
            zjElem
          )
        );
        break;
      }

      let keyRow = 0;
      let prev = fraction(table[0][2]) / fraction(table[0][keyCol]);
      if (prev <= 0) prev = 9999;
      table.map((data, index) => {
        const dtemp = fraction(data[2]) / fraction(data[keyCol]);
        if (dtemp < prev && dtemp >= 0) {
          keyRow = index;
          prev = dtemp;
        }
      });

      console.log("Key row:", keyRow + 1);
      let keyRHTML = `Ключовий рядок: ${keyRow + 1}`;

      let keyElementHTML = `Ключовий елемент: ${table[keyRow][keyCol]}`;

      html_res.push(
        convertConsoleTableToHTML(
          table,
          zjcjHTML,
          keyCHTML,
          keyRHTML,
          keyElementHTML,
          solved,
          zjElem
        )
      );

      simplifyTable(keyRow, keyCol);
    }

    function simplifyTable(keyRow, keyCol) {
      const keyElement = table[keyRow][keyCol];
      console.log("Key Element:", keyElement);
      for (let i = 2; i < table[keyRow].length; i++) {
        table[keyRow][i] = format(
          fraction(fraction(table[keyRow][i]) / fraction(keyElement)),
          { fraction: "ratio" }
        );
      }
      table.map((data, i) => {
        if (i !== keyRow) {
          let cnst = fraction(data[keyCol]);
          for (let j = 2; j < data.length; ++j) {
            table[i][j] = format(
              fraction(
                fraction(table[i][j]) - cnst * fraction(table[keyRow][j])
              ),
              { fraction: "ratio" }
            );
          }
        }
      });

      table[keyRow][0] = cj[keyCol - 3];
      table[keyRow][1] =
        keyCol - 2 <= cj.length - constrainEquations.length
          ? `x${keyCol - 2}`
          : `s${keyCol - constrainEquations[0].length}`;
    }
    setMatrices(html_res);

    if (flag == true) {
      Gomori(convertMatrixToGomori(table), zj_cj_glob);
    }
    return html_res;
  }

  function convertMatrixToGomori(tableData) {
    const formattedData = tableData.map((row) => {
      const newRow = row.slice(2).map((cell) => fraction(cell));
      return newRow;
    });
    return formattedData;
  }

  const [tableData, setTableData] = useState([
    ["0.3", "0.1", "0.2", "0", "0", "0", "0", "0", "0", "50"],
    ["0", "0", "0", "0.5", "0.2", "0.4", "0", "0", "0", "60"],
    ["0", "0", "0", "0", "0", "0", "0.4", "0.5", "0.3", "40"],
  ]);

  const [functionData, setFunctionData] = useState([
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
  ]);

  function formatTableData(tableData) {
    const formattedData = tableData.map((row) => {
      const newRow = row.map((cell) => Number(cell));
      newRow.push("<=");
      return newRow;
    });
    console.log(formattedData);
    return formattedData;
  }

  function formatFunctionalData(tableData) {
    const numericArray = tableData.map((element) => Number(element));
    numericArray.push("Max");
    console.log(numericArray);
    return numericArray;
  }

  const [headerData, setHeaderData] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "Ресурс часу",
  ]);

  const handleInputChangeFunction = (columnIndex, value) => {
    setFunctionData((prevTableData) => {
      const newTableData = [...prevTableData];
      newTableData[columnIndex] = value;
      return newTableData;
    });
  };

  const handleInputChange = (rowIndex, columnIndex, value) => {
    setTableData((prevTableData) => {
      const newTableData = [...prevTableData];
      newTableData[rowIndex][columnIndex] = value;
      return newTableData;
    });
  };

  const handleAddRow = () => {
    setTableData((prevTableData) => [
      ...prevTableData,
      Array(prevTableData[0].length).fill(""),
    ]);
  };

  const handleAddColumn = () => {
    const nextColumnIndex = headerData.length - 1;
    const nextColumnHeader = String.fromCharCode(65 + nextColumnIndex);
    setTableData((prevTableData) =>
      prevTableData.map((row, rowIndex) => [
        ...row.slice(0, -1),
        "",
        rowIndex < prevTableData.length - 1
          ? prevTableData[rowIndex][prevTableData[0].length - 1]
          : "",
      ])
    );
    setHeaderData((prevHeaderData) => [
      ...prevHeaderData.slice(0, -1),
      nextColumnHeader,
      ...prevHeaderData.slice(-1),
    ]);

    setFunctionData((prevFunctionData) => {
      const newFunctionData = [...prevFunctionData];
      newFunctionData.splice(nextColumnIndex, 0, "");
      return newFunctionData;
    });
  };

  const handleDeleteRow = (rowIndex) => {
    setTableData((prevTableData) =>
      prevTableData.filter((_, index) => index !== rowIndex)
    );
  };

  const handleDeleteColumn = (columnIndex) => {
    setTableData((prevTableData) =>
      prevTableData.map((row) =>
        row.filter((_, index) => index !== columnIndex + 1)
      )
    );
    setHeaderData((prevHeaderData) =>
      prevHeaderData.filter((_, index) => index !== columnIndex + 1)
    );

    setFunctionData((prevFunctionData) => {
      const newFunctionData = [...prevFunctionData];
      newFunctionData.splice(columnIndex + 1, 1);
      return newFunctionData;
    });
  };

  function convertfraction(fractionInp) {
    let numerator = fractionInp.n;
    let denominator = fractionInp.d;
    return fraction(numerator % denominator, denominator);
  }

  function vstack(arrays) {
    const result = arrays.reduce((acc, array) => acc.concat(array), []);

    return result;
  }

  function modifyMatrixToSimplexGomory(matrix) {
    const modifiedMatrix = matrix.map((row) => {
      const firstElement = row.shift();
      row.push(firstElement);
      row.push(">=");
      return row;
    });

    return modifiedMatrix;
  }

  function Gomori(table, indexState) {
    let X = [];
    let index = [];
    for (let i = 0; i < table.length; i++) {
      console.log(fraction(table[i][0]));
      if (!isInteger(fraction(table[i][0]))) {
        X.push(convertfraction(fraction(table[i][0])));
        index.push(i);
      }
    }
    if (index.length === 0) {
      let cut = false;
      return [table, cut];
    }
    let b = Math.max(...X);
    let constraint = [];
    constraint.push(-b);
    for (let i = 1; i < table[0].length; i++) {
      constraint.push(-convertfraction(fraction(table[index[0]][i])));
    }
    table = vstack([table, [constraint]]);
    let cut = true;
    indexState.push("Max");
    let tablemodify = modifyMatrixToSimplexGomory(table);
    SimplexGomori(indexState, tablemodify);
    return [table, cut];
  }

  function GetResultHandle() {
    Simplex(
      formatFunctionalData(functionData),
      formatTableData(tableData),
      false
    );
    setMatricesGomori([]);
  }

  return (
    <div style={{ margin: "50px 0px 50px 0px" }}>
      <div>
        <p> Цільова функція</p>
        <table style={{ margin: "20px" }}>
          <tbody>
            <tr>
              {functionData.map((cell, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    style={{ width: "70px" }}
                    value={cell}
                    type="text"
                    onChange={(e) =>
                      handleInputChangeFunction(columnIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {headerData.map((header, index) => (
              <th key={index}>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteColumn(index - 1)}
                >
                  {header}
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteRow(rowIndex)}
                >
                  {rowIndex + 1}
                </Button>
              </td>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    style={{ width: "70px" }}
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleInputChange(rowIndex, columnIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ButtonGroup
        style={{ margin: "20px 0px 50px 0px" }}
        aria-label="Basic example"
      >
        <Button variant="info" onClick={handleAddRow}>
          Додати верстат
        </Button>
        <Button variant="warning" onClick={handleAddColumn}>
          Додати деталь
        </Button>
        <Button onClick={() => GetResultHandle()} variant="success">
          Порахувати
        </Button>

        <Button
          onClick={() => Simplex(objectiveEquation, constrainEquations, true)}
          variant="success"
        >
          Порахувати задачу з Gomori
        </Button>
      </ButtonGroup>

      <div>
        {matrices.map((value) => {
          return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
        })}
      </div>
      <div>
        {matricesGomori.map((value) => {
          return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
        })}
      </div>
    </div>
  );
};

export default TableComponent;
