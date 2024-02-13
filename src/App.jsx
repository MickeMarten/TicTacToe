import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="border-2 w-8 h-8" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Input() {
  return;
}
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerOneValue, setPlayerOneValue] = useState("");
  const [playerTwoValue, setPlayerTwoValue] = useState("");

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    status = "next player:" + (xIsNext ? "x" : "o");
  }

  const handlePlayerOneChange = (event) => {
    setPlayerOneValue(event.target.value);
  };
  const handlePlayerTwoChange = (event) => {
    setPlayerTwoValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Player 1 value is:", playerOneValue);
    console.log("Player 2 value is:", playerTwoValue);
    // Gör något med player1Value och player2Value här
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Spelare 1:{" "}
          <input
            value={playerOneValue}
            name="playerOne"
            placeholder={"Skriv här"}
            onChange={handlePlayerOneChange}
          />
        </label>
        <label>
          Spelare 2:{" "}
          <input
            value={playerTwoValue}
            name="playerTwo"
            placeholder={"skriv här"}
            onChange={handlePlayerTwoChange}
          />
        </label>
        <button>Starta spel</button>
      </form>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
