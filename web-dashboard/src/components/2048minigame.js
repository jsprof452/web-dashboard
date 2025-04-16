import React, { useState, useEffect} from "react"
import "../2048minigame.css"

const SIZE = 4

function getEmptyBoard() {
    return Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(0));
  }
  
  function addRandom(board) {
    const empty = [];
    board.forEach((row, r) =>
      row.forEach((val, c) => {
        if (val === 0) empty.push([r, c]);
      })
    );
    if (empty.length === 0) return board;
  
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
    return board;
  }
  
//   function clone(board) {
//     return board.map((row) => row.slice());
//   }
  
  const React2048 = () => {
    const [board, setBoard] = useState(addRandom(addRandom(getEmptyBoard())));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false)
    const [victory, setVictory] = useState(false)
  
    const handleKeyDown = (e) => {

        if(gameOver || victory) {return}

      const move = (dir) => {
        let rotated = rotateBoard(board, dir);
        let [collapsed, points] = collapseBoard(rotated);
        let unrotated = rotateBoard(collapsed, (4 - dir) % 4);
        let changed = JSON.stringify(board) !== JSON.stringify(unrotated);
        return [unrotated, points, changed];
      };
  if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        const direction = {
          ArrowUp: 3,
          ArrowRight: 2, 
          ArrowDown: 1,
          ArrowLeft: 0,
        }[e.key];
  
        const [movedBoard, points, changed] = move(direction);
        if (changed) {
          const newBoard = addRandom(movedBoard)
          setScore(score + points);
          setBoard(addRandom(movedBoard));

          // Check victory
        if (newBoard.flat().includes(2048)) {
            setVictory(true);
          }
  
          // Check game over
          if (!canMove(newBoard)) {
            setGameOver(true);
          }

        }
      }
    };

    const restartGame = () => {
        setBoard(addRandom(addRandom(getEmptyBoard())));
        setScore(0);
        setGameOver(false);
        setVictory(false);
      }
  
    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    });
  
    return (
      <div className="game-container">
        <h2 className="game-title">2048</h2>
        <div className="game-score">Score: {score}</div>
        <div className="game-grid">
          {board.flat().map((val, i) => (
            <div key={i} className="tile">
              {val !== 0 ? val : ""}
            </div>
          ))}
        </div>

        <button className="restart-button" onClick={restartGame}>Restart</button>

        {victory && <div className="victory overlay">You win :)</div>}
        {gameOver && <div className="gameOver overlay">Game Over :(</div>}

      </div>
    );
  };
  
  // Helper functions
  function rotateBoard(board, times) {
    let rotated = board;
  
    for (let t = 0; t < times; t++) {
      const newBoard = [];
      for (let col = 0; col < SIZE; col++) {
        const newRow = [];
        for (let row = SIZE - 1; row >= 0; row--) {
          newRow.push(rotated[row][col]);
        }
        newBoard.push(newRow);
      }
      rotated = newBoard;
    }
  
    return rotated;
  }
  
  function collapseBoard(board) {
    let score = 0;
    const newBoard = board.map((row) => {
      const filtered = row.filter((val) => val !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          score += filtered[i];
          filtered[i + 1] = 0;
        }
      }
      return [...filtered.filter((val) => val !== 0), ...Array(SIZE).fill(0)].slice(0, SIZE);
    });
    return [newBoard, score];
  }

  function canMove(board) {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === 0) return true;
        if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return true;
        if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return true;
      }
    }
    return false;
  }
  
  export default React2048;