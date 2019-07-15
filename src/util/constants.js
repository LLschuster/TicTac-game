export const WinningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  export function MapPlayerMoves(current)
  {
    let playerMoves = Array(9).fill(null);
    current.map((move, step) => {
      if (move==='X') {
          playerMoves[step] = 1;
      } else {playerMoves[step] = null;}
    })
    return playerMoves;
  }

  export   function calculateWinner(squares) {
    const lines = WinningLines;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }