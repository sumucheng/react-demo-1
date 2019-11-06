import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const Cell = function(props) {
  return (
    <div className="cell" onClick={props.onClick}>
      {props.text}
    </div>
  );
};

const Chessboard = function() {
  const [cells, setCells] = React.useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  const [finished, setFinished] = React.useState(false);
  const [n, setN] = React.useState(0);
  const [winner, setWinner] = React.useState();
  const tell = cells => {
    for (let i = 0; i < 3; i++) {
      if (
        cells[i][0] === cells[i][1] &&
        cells[i][1] === cells[i][2] &&
        cells[i][0] !== null
      ) {
        setWinner(cells[i][0]);
        setFinished(true);
        break;
      }
    }
    for (let j = 0; j < 3; j++) {
      if (
        cells[0][j] === cells[1][j] &&
        cells[1][j] === cells[2][j] &&
        cells[0][j] !== null
      ) {
        setWinner(cells[0][j]);
        setFinished(true);
        break;
      }
    }
    if (
      cells[0][0] === cells[1][1] &&
      cells[1][1] === cells[2][2] &&
      cells[0][0] !== null
    ) {
      setWinner(cells[0][0]);
      setFinished(true);
    }
    if (
      cells[0][2] === cells[1][1] &&
      cells[1][1] === cells[2][0] &&
      cells[0][2] !== null
    ) {
      setWinner(cells[0][2]);
      setFinished(true);
    }
  };

  const onClickCell = (row, col) => {
    const copy = JSON.parse(JSON.stringify(cells));
    if (copy[row][col] === null) {
      setN(n + 1);
      copy[row][col] = n % 2 === 0 ? "x" : "o";
      setCells(copy);
      tell(copy);
    }
  };
  return (
    <div className="board">
      <div className="panel">
        <div>
          现在轮到 :<div className="player">{n % 2 === 0 ? "x" : "o"}</div>
        </div>
      </div>
      <div className="chess">
        {cells.map((items, row) => (
          <div className="row">
            {items.map((item, col) => (
              <div className="col">
                <Cell text={item} onClick={() => onClickCell(row, col)} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {finished && (
        <div className="gameOver">
          <div className="winnerText">{winner} win!</div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(
  <div>
    <Chessboard />
  </div>,
  document.getElementById("root")
);
