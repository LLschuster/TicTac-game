import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board'
import {WinningLines, MapPlayerMoves, calculateWinner} from './util/constants'
import './index.css';

  class Game extends React.Component {
      constructor(props)
      {
          super(props);
          this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepView: 0,
          };
      }
      
      handleSquareClick(i) {
        const history = this.state.history.slice(0, this.state.stepView + 1);
        let current = history[this.state.stepView];
        let squares = current.squares.slice();
        if (calculateWinner(current.squares) || current.squares[i])
          return;
        squares[i] =  'X';
        this.setState(
            {history: history.concat([{squares : squares}]),
             xIsNext: !this.state.xIsNext,
             stepView: history.length,
          });
          this.handleAI(squares);
    }

    handleAI(squares)
    {
      if (calculateWinner(squares))
          return;
      let noLoseMove =this.IsPlayerGoingToWin(squares);
      console.log(noLoseMove);
      if (noLoseMove)
      {
        squares[noLoseMove] = 'O';
      } else {
      for (let i=0; i<squares.length; i++)
      {
        if (!squares[i])
          {
            squares[i] = 'O';
            return;
          }
      }
    }
    }
    IsPlayerGoingToWin(squares)
    {
      const lines = WinningLines;
      let playerMoves = MapPlayerMoves(squares);
      if (this.state.stepView===1 && playerMoves[4] && playerMoves[8])
          return 2;
      if (this.state.stepView===0 && (playerMoves[0] || playerMoves[8] || playerMoves[2] || playerMoves[6]))
          return 4;
     
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        
        if (playerMoves[a] && playerMoves[a] === playerMoves[b]  && squares[c]!=='O')
            return c
        if (playerMoves[a] && playerMoves[a] === playerMoves[c] && squares[b]!=='O')
            return b
        if (playerMoves[c] && playerMoves[c] === playerMoves[b]  && squares[a]!=='O')
            return a
        }
      return null;
    }
    jumpTo (step)
    {
        this.setState({
            stepView: step,
            xIsNext : step%2===0,
        })
    }
    GetCurrentMoves() {
      const history = this.state.history;
      let current = history[this.state.stepView];
      return {history, current}
    }
    render() {
        let {history, current} = this.GetCurrentMoves();
        const winner = calculateWinner(current.squares)
        const moves = history.map((step,move)=> {
            const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (<li>
            <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>);
        });
        
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares}
            onClick = {(i)=>this.handleSquareClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  