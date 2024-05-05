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

  const boardWithAssists = structuredClone(board);

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      boardWithAssists[y][x] = board[y][x];
    }
  }

  let blackPoint = 0;
  let whitePoint = 0;
  for (let y = 1; y < 8; y++) {
    for (let x = 1; x < 8; x++) {
      const color = board[y][x];
      if (color === 1) {
        blackPoint++;
      } else if (color === 2) {
        whitePoint++;
      }
    }
  }

  // const clickHandler = (x: number, y: number) => {
  //   console.log(x, y);
  //   const newBoard = structuredClone(board);

  //   if (board[y][x] !== 0) return;

  //   for (const [dy, dx] of directions) {
  //     // const nx = x + dx;
  //     // const ny = y + dy;
  //     let findOpponent: boolean = false;
  //     let i = 0;

  //     while (i < 8) {
  //       i++;

  //       const stone = board[y + dy * i][x + dx * i];

  //       if (stone === 0) break; //石が空の石の時
  //       if (stone === 3 - turnColor) { //石が相手の石の時
  //         findOpponent = true;
  //         continue;
  //       }
  //       if (stone === turnColor) { //自分の色に到達した
  //         if (findOpponent) { //相手の石を挟んでいるとき
  //           newBoard[y][x] = turnColor;
  //           setBoard(newBoard);
  //           setTurnColor(3 - turnColor);
  //           break;
  //         } else { //相手の色を挟んでいないとき
  //           break;
  //         }
  //       }
  //     }
  //   }

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    if (board[y][x] !== 0) return; //すでに石が置いてある場合、何もしない

    const newBoard = structuredClone(board);
    let findOpponent: boolean = false;

    for (const [dy, dx] of directions) {
      const tilesToFlip = []; //候補リスト
      let nx, ny;

      for (let i = 1; i < 8; i++) {
        //石がひっくり返せるまで
        nx = x + dx * i;
        ny = y + dy * i;

        //【石がない場合】
        // ボードの範囲を超えた場合、または石が置いていないセルに達した場合はループを終了し、forループに戻る
        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8 || board[ny][nx] === 0) break;

        //【石がある場合】
        // 異なる石に到達した場合: tilesToFlip候補リストに記録
        if (board[ny][nx] === 3 - turnColor) {
          tilesToFlip.push([ny, nx]);

          //自分の色に到達したとき
        } else if (board[ny][nx] === turnColor) {
          if (tilesToFlip.length > 0) {
            // 自分の色の石に到達し、反転する石のリストが空でない場合
            findOpponent = true; // 石がひっくり返せる
            newBoard[y][x] = turnColor; // 新しい石を置く
            for (const [flipY, flipX] of tilesToFlip) {
              newBoard[flipY][flipX] = turnColor;
            }
          }
          break; //自分の色に到達したが、相手の色を挟んでない場合はループを終了し、forループにもどる
        }
      }
    } //forループ完了

    // 有効な手の場合のみボードとターンを更新
    if (findOpponent) {
      setBoard(newBoard);
      setTurnColor(3 - turnColor);
    }
  };

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

  //   setBoard(newBoard);
  // };
  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {boardWithAssists.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : color === 2 ? '#ffff' : '#f1f19c' }}
                />
              )}
            </div>
          )),
        )}
      </div>

      <div className={styles.turnStyle}>{turnColor === 1 ? '黒' : '白'}の番です</div>
      <div className={styles.turnStyle}>黒は{blackPoint}点です</div>
      <div className={styles.turnStyle}>白は{whitePoint}点です</div>
      <div className={styles.turnStyle}>{blackPoint === whitePoint ? '同点です' : ''}</div>
    </div>
  );
};

export default Home;
