import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);

    if (board[y][x] !== 0) return;

    for (const [dy, dx] of directions) {
      // const nx = x + dx;
      // const ny = y + dy;
      let findOpponent: boolean = false;
      let i = 0;

      while (i < 8) {
        i++;

        const stone = board[y + dy * i][x + dx * i];

        if (stone === 0) break;
        if (stone === 3 - turnColor) {
          findOpponent = true;
          continue;
        }
        if (stone === turnColor) {
          if (findOpponent) {
            newBoard[y][x] = turnColor;
            setBoard(newBoard);
            setTurnColor(3 - turnColor);
            break;
          } else {
            break;
          }
        }
      }
    }

    // if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
    //   for (let n = 1; y + n < board.length; n++) {
    //     console.log(n);
    //     if (board[y + n] !== undefined && board[y + n][x] === turnColor) {
    //       while (n > 0) {
    //         newBoard[y + n][x] = turnColor;
    //         n--;
    //       }
    //       break;
    //     }
    //   }
    //   newBoard[y][x] = turnColor;
    //   console.log(newBoard);
    //   setBoard(newBoard);
    //   setTurnColor(3 - turnColor);
    // }

    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
